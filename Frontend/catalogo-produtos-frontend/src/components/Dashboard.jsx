import { useMemo } from "react";
import { useTheme } from "../hooks/useTheme";
import { getThemeColors } from "../constants/theme";
import { formatCurrency, pluralize } from "../utils/format";
import Modal from "./Modal";

function Dashboard({ produtos, onClose }) {
  const { isDarkMode } = useTheme();
  const c = getThemeColors(isDarkMode);

  const metrics = useMemo(() => {
    const totalProdutos = produtos.length;
    const produtosAtivos = produtos.filter((p) => p.ativo).length;
    const produtosInativos = produtos.filter((p) => !p.ativo).length;
    const valorTotalEstoque = produtos.reduce((total, p) => total + p.preco * p.estoque, 0);
    const produtosEstoqueBaixo = produtos.filter((p) => p.estoque < 10 && p.estoque > 0);
    const produtosSemEstoque = produtos.filter((p) => p.estoque === 0);
    const produtosMaisCaros = [...produtos].sort((a, b) => b.preco - a.preco).slice(0, 5);
    const produtosMaisBaratos = [...produtos].sort((a, b) => a.preco - b.preco).slice(0, 5);

    const categorias = {};
    produtos.forEach((p) => {
      if (!categorias[p.categoria]) {
        categorias[p.categoria] = { count: 0, valor: 0 };
      }
      categorias[p.categoria].count++;
      categorias[p.categoria].valor += p.preco * p.estoque;
    });

    const mediaPrecos =
      totalProdutos > 0
        ? produtos.reduce((total, p) => total + p.preco, 0) / totalProdutos
        : 0;

    return {
      totalProdutos,
      produtosAtivos,
      produtosInativos,
      valorTotalEstoque,
      produtosEstoqueBaixo,
      produtosSemEstoque,
      produtosMaisCaros,
      produtosMaisBaratos,
      categorias,
      mediaPrecos
    };
  }, [produtos]);

  const cardStyle = {
    background: isDarkMode ? c.bgTertiary : c.bgMuted,
    border: `1px solid ${c.borderStrong}`,
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center"
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="📊 Dashboard"
      titleId="dashboard-title"
      isDarkMode={isDarkMode}
      maxWidth="800px"
    >
      <button
        type="button"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "32px",
          cursor: "pointer",
          color: c.textSecondary,
          padding: 0,
          width: "32px",
          height: "32px"
        }}
        onClick={onClose}
        aria-label="Fechar dashboard"
      >
        ×
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px"
        }}
      >
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px", color: c.textPrimary }}>
            Total de Produtos
          </h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0", color: c.primary }}>
            {metrics.totalProdutos}
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, margin: "4px 0" }}>
            {metrics.produtosAtivos} {pluralize(metrics.produtosAtivos, "ativo", "ativos")},{" "}
            {metrics.produtosInativos} {pluralize(metrics.produtosInativos, "inativo", "inativos")}
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px", color: c.textPrimary }}>
            Valor Total do Estoque
          </h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0", color: c.primary }}>
            {formatCurrency(metrics.valorTotalEstoque)}
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, margin: "4px 0" }}>valor total em estoque</p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px", color: c.textPrimary }}>
            Preço Médio
          </h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0", color: c.primary }}>
            {formatCurrency(metrics.mediaPrecos)}
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, margin: "4px 0" }}>média de todos os produtos</p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px", color: c.textPrimary }}>
            Estoque Baixo
          </h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0", color: c.primary }}>
            {metrics.produtosEstoqueBaixo.length}
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, margin: "4px 0 12px" }}>
            {pluralize(metrics.produtosEstoqueBaixo.length, "produto", "produtos")} com menos de 10 unidades
          </p>
          {metrics.produtosEstoqueBaixo.length > 0 && (
            <ListItems items={metrics.produtosEstoqueBaixo.slice(0, 3)} c={c} render={(p) => (
              <><strong>{p.nome}</strong> - {p.estoque} unidades</>
            )} total={metrics.produtosEstoqueBaixo.length} />
          )}
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px", color: c.textPrimary }}>
            Sem Estoque
          </h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0", color: c.primary }}>
            {metrics.produtosSemEstoque.length}
          </p>
          <p style={{ fontSize: "14px", color: c.textSecondary, margin: "4px 0 12px" }}>
            {pluralize(metrics.produtosSemEstoque.length, "produto", "produtos")} esgotado(s)
          </p>
          {metrics.produtosSemEstoque.length > 0 && (
            <ListItems items={metrics.produtosSemEstoque.slice(0, 3)} c={c} render={(p) => (
              <><strong>{p.nome}</strong> - Esgotado</>
            )} total={metrics.produtosSemEstoque.length} />
          )}
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px", color: c.textPrimary }}>
            Produtos Mais Caros
          </h3>
          <ListItems
            items={metrics.produtosMaisCaros}
            c={c}
            render={(p) => (
              <><strong>{p.nome}</strong> - {formatCurrency(p.preco)}</>
            )}
          />
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px", color: c.textPrimary }}>
            Produtos Mais Baratos
          </h3>
          <ListItems
            items={metrics.produtosMaisBaratos}
            c={c}
            render={(p) => (
              <><strong>{p.nome}</strong> - {formatCurrency(p.preco)}</>
            )}
          />
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px", color: c.textPrimary }}>
            Por Categoria
          </h3>
          <div style={{ textAlign: "left" }}>
            {Object.entries(metrics.categorias).map(([categoria, dados]) => (
              <div
                key={categoria}
                style={{
                  fontSize: "14px",
                  padding: "4px 0",
                  borderBottom: `1px solid ${c.borderStrong}`,
                  color: c.textSecondary
                }}
              >
                <strong style={{ color: c.textPrimary }}>{categoria || "Sem categoria"}</strong>: {dados.count}{" "}
                {pluralize(dados.count, "produto", "produtos")}
                <br />
                <small>Valor: {formatCurrency(dados.valor)}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function ListItems({ items, render, total, c }) {
  return (
    <div style={{ textAlign: "left" }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            fontSize: "14px",
            padding: "4px 0",
            borderBottom: `1px solid ${c.borderStrong}`,
            color: c.textSecondary
          }}
        >
          {render(item)}
        </div>
      ))}
      {total > 3 && (
        <div style={{ fontSize: "14px", padding: "4px 0", color: c.textSecondary }}>
          ...e mais {total - 3} {pluralize(total - 3, "produto", "produtos")}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
