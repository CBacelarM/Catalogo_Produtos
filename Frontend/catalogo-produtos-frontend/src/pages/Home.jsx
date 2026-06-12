import { useState } from "react";
import { useProdutos } from "../hooks/useProdutos";
import { useToast } from "../hooks/useToast";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";
import Dashboard from "../components/Dashboard";

function Home() {
  const {
    produtos,
    produtosFiltrados,
    produtosPaginados,
    busca,
    categoria,
    disponibilidade,
    ordenacao,
    loading,
    error,
    currentPage,
    totalPages,
    setBusca,
    setCategoria,
    setDisponibilidade,
    setOrdenacao,
    setCurrentPage,
    loadProdutos,
    confirmDelete
  } = useProdutos();

  const { showToast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [produtoDelete, setProdutoDelete] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

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

  async function handleConfirmDelete(id) {
    try {
      await confirmDelete(id);
      setOpenDelete(false);
      setProdutoDelete(null);
      showToast("Produto excluído com sucesso.", "success");
    } catch (err) {
      console.error(err);
      showToast("Erro ao excluir produto. Tente novamente.");
    }
  }

  return (
    <div className="page-container">
      <Header
        busca={busca}
        categoria={categoria}
        disponibilidade={disponibilidade}
        ordenacao={ordenacao}
        onSearch={setBusca}
        onCategoriaChange={setCategoria}
        onDisponibilidadeChange={setDisponibilidade}
        onNewProduct={handleNew}
        onOrderChange={setOrdenacao}
        onShowDashboard={() => setShowDashboard(true)}
      />

      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button type="button" onClick={loadProdutos}>
            Tentar novamente
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-state">
          <div className="spinner" />
          <p className="loading-text">Carregando produtos...</p>
        </div>
      )}

      {!loading && produtosFiltrados.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">📭</div>
          <h2 className="empty-state__title">Nenhum produto encontrado</h2>
          <p className="empty-state__subtitle">
            Tente ajustar seus filtros ou criar um novo produto
          </p>
          <button type="button" onClick={handleNew} className="btn-primary">
            + Novo Produto
          </button>
        </div>
      )}

      {!loading && produtosFiltrados.length > 0 && (
        <div className="product-grid">
          {produtosPaginados.map((p) => (
            <ProductCard
              key={p.id}
              produto={p}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && produtosFiltrados.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination__btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            className="pagination__btn"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
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
        onConfirm={handleConfirmDelete}
        produto={produtoDelete}
      />

      {showDashboard && (
        <Dashboard produtos={produtos} onClose={() => setShowDashboard(false)} />
      )}
    </div>
  );
}

export default Home;
