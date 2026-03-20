import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    api.get("/produtos", {
      params: {
        nome: busca,
        categoria: categoria
      }
    })
      .then(response => setProdutos(response.data))
      .catch(error => console.error(error));
  }, [busca, categoria]);

  return (
    <div style={{ padding: "20px" }}>
      <Header 
        onSearch={setBusca} 
        onCategoriaChange={setCategoria} 
      />

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {produtos.map(p => (
          <ProductCard key={p.id} produto={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;