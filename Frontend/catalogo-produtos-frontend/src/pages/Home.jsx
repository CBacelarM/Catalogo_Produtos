import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get("/produtos")
      .then(response => setProdutos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Produtos</h1>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {produtos.map(p => (
          <ProductCard key={p.id} produto={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;