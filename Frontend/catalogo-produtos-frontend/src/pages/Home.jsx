import { useEffect, useState } from "react";
import api from "../services/api";

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
      {produtos.map(p => (
        <div key={p.id}>
          <h3>{p.nome}</h3>
          <p>R$ {p.preco}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;