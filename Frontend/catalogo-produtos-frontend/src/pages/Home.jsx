import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";
import Dashboard from "../components/Dashboard";
import { useTheme } from "../contexts/ThemeContext";

function Home() {
  const { isDarkMode } = useTheme();
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
  const [showDashboard, setShowDashboard] = useState(false);

  const loadProdutos = useCallback(() => {
    setLoading(true);
    api.get("/produtos", {
      params: { nome: busca, categoria }
    })
      .then(res => {
        setProdutos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao carregar produtos. Tente novamente.");
        setLoading(false);
      });
  }, [busca, categoria]);

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

  function filtrarProdutos(items) {
    if (!disponibilidade) return items;

    switch(disponibilidade) {
      case "disponiveis":
        return items.filter(p => p.estoque > 0);
      case "semEstoque":
        return items.filter(p => p.estoque === 0);
      default:
        return items;
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    loadProdutos();
  }, [loadProdutos]);

  function handleEdit(produto) {
    setProdutoEdit(produto);
    setOpenModal(true);
  }

  function handleNew() {
    setProdutoEdit(null);
    setOpenModal(true);
  }

  function handleShowDashboard() {
    setShowDashboard(true);
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
      alert("Erro ao excluir produto. Tente novamente.");
    }
  }

  const produtosFiltrados = filtrarProdutos(produtos);
  const produtosOrdenados = ordenarProdutos(produtosFiltrados);

  const styles = getStyles(isDarkMode);

  return (
    <div style={styles.container}>
      
      <Header 
        onSearch={setBusca}
        onCategoriaChange={setCategoria}
        onDisponibilidadeChange={setDisponibilidade}
        onNewProduct={handleNew}
        onOrderChange={setOrdenacao}
        onShowDashboard={handleShowDashboard}
      />

      {/* LOADING */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Carregando produtos...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && produtosOrdenados.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h2 style={styles.emptyTitle}>Nenhum produto encontrado</h2>
          <p style={styles.emptyText}>Tente ajustar seus filtros ou criar um novo produto</p>
          <button onClick={handleNew} style={styles.emptyButton}>
            + Novo Produto
          </button>
        </div>
      )}

      {/* GRID */}
      {!loading && produtosOrdenados.length > 0 && (
      <div style={styles.grid}>
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

      {showDashboard && (
        <Dashboard
          produtos={produtos}
          onClose={() => setShowDashboard(false)}
        />
      )}
    </div>
  );
}
const getStyles = (isDarkMode) => ({
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    color: isDarkMode ? "#F9FAFB" : "#111827"
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    flexDirection: "column",
    gap: "20px"
  },
  spinner: {
    border: `4px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
    borderTop: "4px solid #3B82F6",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite"
  },
  loadingText: {
    color: isDarkMode ? "#9CA3AF" : "#6B7280",
    fontSize: "16px"
  },
  emptyState: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    flexDirection: "column",
    gap: "20px",
    textAlign: "center"
  },
  emptyIcon: {
    fontSize: "60px"
  },
  emptyTitle: {
    color: isDarkMode ? "#9CA3AF" : "#6B7280",
    margin: 0
  },
  emptyText: {
    color: isDarkMode ? "#6B7280" : "#9CA3AF",
    margin: 0
  },
  emptyButton: {
    background: "#3B82F6",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  }
});
export default Home;