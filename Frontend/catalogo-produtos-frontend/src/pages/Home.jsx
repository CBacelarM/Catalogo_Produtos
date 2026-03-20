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

  return (
    <div style={{ padding: "20px" }}>
      
      <Header 
        onSearch={setBusca} 
        onCategoriaChange={setCategoria}
        onNewProduct={() => setOpenModal(true)} 
      />

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {produtos.map(p => (
          <ProductCard key={p.id} produto={p} />
        ))}
      </div>

      <ProductModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={loadProdutos} 
      />

    </div>
  );
}

export default Home;