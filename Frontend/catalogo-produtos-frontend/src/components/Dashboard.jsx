import { useTheme } from "../contexts/ThemeContext";

function Dashboard({ produtos, onClose }) {
  const { isDarkMode } = useTheme();

  // Cálculos das métricas
  const totalProdutos = produtos.length;
  const produtosAtivos = produtos.filter(p => p.ativo).length;
  const produtosInativos = produtos.filter(p => !p.ativo).length;
  const valorTotalEstoque = produtos.reduce((total, p) => total + (p.preco * p.estoque), 0);
  const produtosEstoqueBaixo = produtos.filter(p => p.estoque < 10 && p.estoque > 0);
  const produtosSemEstoque = produtos.filter(p => p.estoque === 0);
  const produtosMaisCaros = [...produtos].sort((a, b) => b.preco - a.preco).slice(0, 5);
  const produtosMaisBaratos = [...produtos].sort((a, b) => a.preco - b.preco).slice(0, 5);

  // Estatísticas por categoria
  const categorias = {};
  produtos.forEach(p => {
    if (!categorias[p.categoria]) {
      categorias[p.categoria] = { count: 0, valor: 0 };
    }
    categorias[p.categoria].count++;
    categorias[p.categoria].valor += p.preco * p.estoque;
  });

  const mediaPrecos = totalProdutos > 0 ? produtos.reduce((total, p) => total + p.preco, 0) / totalProdutos : 0;

  const styles = getStyles(isDarkMode);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>📊 Dashboard</h2>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div style={styles.grid}>
          {/* Total de Produtos */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Total de Produtos</h3>
            <p style={styles.metric}>{totalProdutos}</p>
            <p style={styles.description}>
              {produtosAtivos} ativos, {produtosInativos} inativos
            </p>
          </div>

          {/* Valor Total do Estoque */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Valor Total do Estoque</h3>
            <p style={styles.metric}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotalEstoque)}
            </p>
            <p style={styles.description}>valor total em estoque</p>
          </div>

          {/* Média de Preços */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Preço Médio</h3>
            <p style={styles.metric}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mediaPrecos)}
            </p>
            <p style={styles.description}>média de todos os produtos</p>
          </div>

          {/* Produtos com Estoque Baixo */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Estoque Baixo</h3>
            <p style={styles.metric}>{produtosEstoqueBaixo.length}</p>
            <p style={styles.description}>produtos com menos de 10 unidades</p>
            {produtosEstoqueBaixo.length > 0 && (
              <div style={styles.list}>
                {produtosEstoqueBaixo.slice(0, 3).map(p => (
                  <div key={p.id} style={styles.listItem}>
                    <strong>{p.nome}</strong> - {p.estoque} unidades
                  </div>
                ))}
                {produtosEstoqueBaixo.length > 3 && (
                  <div style={styles.listItem}>...e mais {produtosEstoqueBaixo.length - 3}</div>
                )}
              </div>
            )}
          </div>

          {/* Produtos Sem Estoque */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Sem Estoque</h3>
            <p style={styles.metric}>{produtosSemEstoque.length}</p>
            <p style={styles.description}>produtos esgotados</p>
            {produtosSemEstoque.length > 0 && (
              <div style={styles.list}>
                {produtosSemEstoque.slice(0, 3).map(p => (
                  <div key={p.id} style={styles.listItem}>
                    <strong>{p.nome}</strong> - Esgotado
                  </div>
                ))}
                {produtosSemEstoque.length > 3 && (
                  <div style={styles.listItem}>...e mais {produtosSemEstoque.length - 3}</div>
                )}
              </div>
            )}
          </div>

          {/* Produtos Mais Caros */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Produtos Mais Caros</h3>
            <div style={styles.list}>
              {produtosMaisCaros.map(p => (
                <div key={p.id} style={styles.listItem}>
                  <strong>{p.nome}</strong> - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.preco)}
                </div>
              ))}
            </div>
          </div>

          {/* Produtos Mais Baratos */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Produtos Mais Baratos</h3>
            <div style={styles.list}>
              {produtosMaisBaratos.map(p => (
                <div key={p.id} style={styles.listItem}>
                  <strong>{p.nome}</strong> - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.preco)}
                </div>
              ))}
            </div>
          </div>

          {/* Distribuição por Categoria */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Por Categoria</h3>
            <div style={styles.list}>
              {Object.entries(categorias).map(([categoria, dados]) => (
                <div key={categoria} style={styles.listItem}>
                  <strong>{categoria || 'Sem categoria'}</strong>: {dados.count} produtos
                  <br />
                  <small>Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.valor)}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getStyles = (isDarkMode) => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: isDarkMode ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: isDarkMode ? "#1F2937" : "#FFFFFF",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "80vh",
    overflow: "auto",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold"
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "32px",
    cursor: "pointer",
    color: isDarkMode ? "#9CA3AF" : "#6B7280",
    padding: "0",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    padding: "20px"
  },
  card: {
    background: isDarkMode ? "#374151" : "#F9FAFB",
    border: `1px solid ${isDarkMode ? "#4B5563" : "#E5E7EB"}`,
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center"
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: isDarkMode ? "#F9FAFB" : "#374151"
  },
  metric: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "8px 0",
    color: isDarkMode ? "#3B82F6" : "#2563EB"
  },
  description: {
    fontSize: "14px",
    color: isDarkMode ? "#9CA3AF" : "#6B7280",
    margin: "4px 0 12px 0"
  },
  list: {
    textAlign: "left"
  },
  listItem: {
    fontSize: "14px",
    padding: "4px 0",
    borderBottom: `1px solid ${isDarkMode ? "#4B5563" : "#E5E7EB"}`,
    color: isDarkMode ? "#D1D5DB" : "#4B5563"
  }
});

export default Dashboard;