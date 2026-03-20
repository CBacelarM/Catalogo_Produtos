import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import ProductModal from "../components/ProductModal";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);

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
    </div>
  );
}

export default Home;