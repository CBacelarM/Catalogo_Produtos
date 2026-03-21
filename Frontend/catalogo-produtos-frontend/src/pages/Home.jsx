import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [produtoDelete, setProdutoDelete] = useState(null);

  function loadProdutos() {
    setLoading(true);
    let params = { nome: busca, categoria };
    if (disponibilidade === "disponiveis") {
      params.ativo = true;
      params.estoqueMin = 1;
    } else if (disponibilidade === "semEstoque") {
      params.estoque = 0;
    }
    api.get("/produtos", { params })
      .then(res => {
        setProdutos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  function ordenarProdutos(items) {
    if (!ordenacao) return items;

    const copia = [...items];

    switch(ordenacao) {
      case "recentes":
        return copia.reverse();
      case "precoMaior":
        return copia.sort((a, b) => b.preco - a.preco);
      case "precoMenor":
        return copia.sort((a, b) => a.preco - b.preco);
      case "alfabetico":
        return copia.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
      default:
        return copia;
    }
  }

  useEffect(() => {
    loadProdutos();
  }, [busca, categoria, disponibilidade]);

  function handleEdit(produto) {
    setProdutoEdit(produto);
    setOpenModal(true);
  }

  function handleNew() {
    setProdutoEdit(null);
    setOpenModal(true);
  }

  function handleDelete(produto) {
    setProdutoDelete(produto);
    setOpenDelete(true);
  }

  async function confirmDelete(id) {
    try {
      await api.delete(`/produtos/${id}`);
      setOpenDelete(false);
      setProdutoDelete(null);
      loadProdutos();
    } catch (err) {
      console.error(err);
    }
  }

  const produtosOrdenados = ordenarProdutos(produtos);

  const totalProdutos = produtos.length;
  const valorTotalEstoque = produtos.reduce((sum, p) => sum + (p.preco * p.estoque), 0);
  const produtosEstoqueBaixo = produtos.filter(p => p.estoque > 0 && p.estoque < 10).length;
  const produtoMaisCaro = produtos.reduce((max, p) => p.preco > max.preco ? p : max, { preco: 0 });
  const produtoMaisBarato = produtos.reduce((min, p) => p.preco < min.preco ? p : min, { preco: Infinity });

  const cardStyle = {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center"
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      
      <Header 
        onSearch={setBusca}
        onCategoriaChange={setCategoria}
        onDisponibilidadeChange={setDisponibilidade}
        onNewProduct={handleNew}
        onOrderChange={setOrdenacao}
      />

      {/* LOADING */}
      {loading && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div style={{
            border: "4px solid #E5E7EB",
            borderTop: "4px solid #3B82F6",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite"
          }} />
          <p style={{ color: "#6B7280", fontSize: "16px" }}>Carregando produtos...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && produtosOrdenados.length === 0 && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          flexDirection: "column",
          gap: "20px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "60px" }}>📭</div>
          <h2 style={{ color: "#6B7280", margin: 0 }}>Nenhum produto encontrado</h2>
          <p style={{ color: "#9CA3AF", margin: 0 }}>Tente ajustar seus filtros ou criar um novo produto</p>
          <button onClick={handleNew} style={{
            background: "#3B82F6",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "10px"
          }}>
            + Novo Produto
          </button>
        </div>
      )}

      {/* DASHBOARD */}
      {!loading && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "20px"
        }}>
          <div style={cardStyle}>
            <h3>Total de Produtos</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalProdutos}</p>
          </div>
          <div style={cardStyle}>
            <h3>Valor Total do Estoque</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotalEstoque)}</p>
          </div>
          <div style={cardStyle}>
            <h3>Produtos com Estoque Baixo</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{produtosEstoqueBaixo}</p>
          </div>
          <div style={cardStyle}>
            <h3>Produto Mais Caro</h3>
            <p style={{ fontSize: "16px" }}>{produtoMaisCaro.nome || "N/A"}</p>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produtoMaisCaro.preco || 0)}</p>
          </div>
          <div style={cardStyle}>
            <h3>Produto Mais Barato</h3>
            <p style={{ fontSize: "16px" }}>{produtoMaisBarato.nome || "N/A"}</p>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produtoMaisBarato.preco === Infinity ? 0 : produtoMaisBarato.preco)}</p>
          </div>
        </div>
      )}

      {/* GRID */}
      {!loading && produtosOrdenados.length > 0 && (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {produtosOrdenados.map(p => (
          <ProductCard
            key={p.id}
            produto={p}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      )}

      <ProductModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setProdutoEdit(null);
        }}
        onCreated={loadProdutos}
        produtoEdit={produtoEdit}
      />

      <DeleteModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
        produto={produtoDelete}
      />
    </div>
  );
}

export default Home;