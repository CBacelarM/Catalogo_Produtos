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
  const [ordenacao, setOrdenacao] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [produtoDelete, setProdutoDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  function loadProdutos() {
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
  }, [busca, categoria]);

  useEffect(() => {
    setCurrentPage(1);
  }, [busca, categoria]);

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

  const totalPages = Math.ceil(produtosOrdenados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const produtosPaginados = produtosOrdenados.slice(startIndex, endIndex);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      
      <Header 
        onSearch={setBusca}
        onCategoriaChange={setCategoria}
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

      {/* GRID */}
      {!loading && produtosOrdenados.length > 0 && (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {produtosPaginados.map(p => (
          <ProductCard
            key={p.id}
            produto={p}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      )}

      {/* PAGINATION */}
      {!loading && produtosOrdenados.length > 0 && totalPages > 1 && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px"
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: "8px 16px",
              background: currentPage === 1 ? "#ccc" : "#3B82F6",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer"
            }}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 16px",
              background: currentPage === totalPages ? "#ccc" : "#3B82F6",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer"
            }}
          >
            Próxima
          </button>
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