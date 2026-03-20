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
  const [openModal, setOpenModal] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [produtoDelete, setProdutoDelete] = useState(null);

  function loadProdutos() {
    api.get("/produtos", {
      params: {
        nome: busca,
        categoria: categoria
      }
    })
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    loadProdutos();
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

  return (
    <div style={{ padding: "20px" }}>
      
      <Header 
        onSearch={setBusca} 
        onCategoriaChange={setCategoria}
        onNewProduct={handleNew}
      />

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {produtos.map(p => (
          <ProductCard 
            key={p.id} 
            produto={p} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

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