import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  async function carregarProdutos() {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Catálogo de Produtos</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {produtos.map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 10, width: 200 }}>
            <img
              src={p.imagemUrl || "https://via.placeholder.com/150"}
              alt={p.nome}
              style={{ width: "100%" }}
            />

            <h3>{p.nome}</h3>
            <p><strong>R$ {p.preco}</strong></p>
            <p>Estoque: {p.estoque}</p>

            {p.estoque < 10 && (
              <span style={{ color: "red" }}>⚠ Estoque baixo</span>
            )}

            {!p.ativo && (
              <span style={{ color: "gray" }}>Indisponível</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}