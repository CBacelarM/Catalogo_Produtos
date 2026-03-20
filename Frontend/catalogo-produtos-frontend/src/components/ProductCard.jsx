import { useState } from "react";

function ProductCard({ produto, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(null);
  const estoque = produto.estoque;
  const isSemEstoque = estoque === 0;
  const isInactive = !produto.ativo && !isSemEstoque;

  const status = isSemEstoque
    ? { text: "❌ Indisponível", bg: "#FEE2E2", color: "#991B1B" }
    : estoque < 10
      ? { text: `⚠ Apenas ${estoque} unidades`, bg: "#FEF3C7", color: "#92400E" }
      : { text: `✅ ${estoque} unidades`, bg: "#D1FAE5", color: "#065F46" };

  const cardStyle = {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "16px",
    transition: "0.2s",
    cursor: "pointer",
    opacity: isSemEstoque ? 0.45 : produto.ativo ? 1 : 0.6,
    filter: isSemEstoque ? "grayscale(80%)" : "none"
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        if (!isSemEstoque) e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={e => {
        if (!isSemEstoque) e.currentTarget.style.transform = "translateY(0)";
      }}
    >

      <img
        src={produto.imagemUrl || "https://picsum.photos/300/200"}
        alt={produto.nome}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      />

      <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
        {produto.nome}
      </h3>

      <p style={{ fontSize: "20px", fontWeight: "700" }}>
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
      </p>

      <span style={{
        display: "inline-block",
        padding: "5px 10px",
        borderRadius: "8px",
        background: status.bg,
        color: status.color,
        fontSize: "12px",
        fontWeight: "600"
      }}>
        {status.text}
      </span>

      <p style={{ color: "#6B7280", marginTop: "8px" }}>
        {produto.categoria}
      </p>

      {!produto.ativo && (
        <p style={{ color: "#EF4444", fontWeight: "bold" }}>
          Indisponível
        </p>
      )}

      <div style={{
        marginTop: "10px",
        display: "flex",
        gap: "10px"
      }}>
        <button
          style={{
            ...btnEdit,
            ...(hovered === "edit" ? btnEditHover : {}),
            ...(!produto.ativo ? btnInactive : {})
          }}
          onClick={() => onEdit(produto)}
          onMouseEnter={() => setHovered("edit")}
          onMouseLeave={() => setHovered(null)}
        >
          Editar
        </button>

        <button
          style={{
            ...btnDelete,
            ...(hovered === "delete" ? btnDeleteHover : {}),
            ...(!produto.ativo ? btnInactive : {})
          }}
          onClick={() => onDelete(produto)}
          onMouseEnter={() => setHovered("delete")}
          onMouseLeave={() => setHovered(null)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

const btnEdit = {
  flex: 1,
  background: "#3B82F6",
  color: "#fff",
  border: "none",
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer"
};

const btnDelete = {
  flex: 1,
  background: "#EF4444",
  color: "#fff",
  border: "none",
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer"
};

const btnEditHover = {
  background: "#2563EB"
};

const btnDeleteHover = {
  background: "#DC2626"
};

const btnInactive = {
  opacity: 0.5,
  cursor: "not-allowed"
};

export default ProductCard;