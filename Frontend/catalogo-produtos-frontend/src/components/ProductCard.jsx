import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

function ProductCard({ produto, onEdit, onDelete }) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(null);
  const estoque = produto.estoque;
  const isSemEstoque = estoque === 0;

  const status = isSemEstoque
    ? { text: "Indisponivel", bg: theme.statusDanger.bg, color: theme.statusDanger.color }
    : estoque < 10
      ? { text: `Apenas ${estoque} unidades`, bg: theme.statusWarning.bg, color: theme.statusWarning.color }
      : { text: `${estoque} unidades`, bg: theme.statusSuccess.bg, color: theme.statusSuccess.color };

  const cardStyle = {
    background: theme.cardBackground,
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    padding: "16px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    opacity: isSemEstoque ? 0.45 : produto.ativo ? 1 : 0.6,
    filter: isSemEstoque ? "grayscale(80%)" : "none",
    color: theme.text
  };

  const btnEdit = {
    flex: 1,
    background: theme.primary,
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s ease"
  };

  const btnDelete = {
    flex: 1,
    background: theme.danger,
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s ease"
  };

  const btnEditHover = {
    background: theme.primaryHover
  };

  const btnDeleteHover = {
    background: theme.dangerHover
  };

  const btnInactive = {
    opacity: 0.5,
    cursor: "not-allowed"
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

      <h3 style={{ fontSize: "16px", fontWeight: "600", color: theme.text }}>
        {produto.nome}
      </h3>

      <p style={{ fontSize: "20px", fontWeight: "700", color: theme.text }}>
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

      <p style={{ color: theme.textSecondary, marginTop: "8px" }}>
        {produto.categoria}
      </p>

      {!produto.ativo && (
        <p style={{ color: theme.danger, fontWeight: "bold" }}>
          Indisponivel
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

export default ProductCard;
