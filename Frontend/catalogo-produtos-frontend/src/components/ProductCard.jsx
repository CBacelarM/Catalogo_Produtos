import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { getThemeColors } from "../constants/theme";
import { formatCurrency } from "../utils/format";

const FALLBACK_IMAGE = "https://picsum.photos/300/200";

function ProductCard({ produto, onEdit, onDelete }) {
  const { isDarkMode } = useTheme();
  const c = getThemeColors(isDarkMode);
  const [hovered, setHovered] = useState(null);
  const [imageError, setImageError] = useState(false);

  const estoque = produto.estoque;
  const isSemEstoque = estoque === 0;

  const status = isSemEstoque
    ? { text: "❌ Indisponível", bg: "#FEE2E2", color: "#991B1B" }
    : estoque < 10
      ? { text: `⚠ Apenas ${estoque} unidades`, bg: "#FEF3C7", color: "#92400E" }
      : { text: `✅ ${estoque} unidades`, bg: "#D1FAE5", color: "#065F46" };

  const imageSrc = imageError || !produto.imagemUrl ? FALLBACK_IMAGE : produto.imagemUrl;

  return (
    <div
      className={`product-card${isSemEstoque ? " product-card--disabled" : ""}`}
      style={{
        background: c.bgCard,
        border: `1px solid ${c.border}`,
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        opacity: isSemEstoque ? 0.45 : produto.ativo ? 1 : 0.6,
        filter: isSemEstoque ? "grayscale(80%)" : "none"
      }}
    >
      <img
        src={imageSrc}
        alt={produto.nome}
        onError={() => setImageError(true)}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      />

      <h3 style={{ fontSize: "16px", fontWeight: "600", color: c.textPrimary }}>
        {produto.nome}
      </h3>

      <p style={{ fontSize: "20px", fontWeight: "700", color: c.textPrimary }}>
        {formatCurrency(produto.preco)}
      </p>

      {produto.descricao && (
        <p style={{ fontSize: "14px", color: c.textSecondary, margin: "5px 0" }}>
          {produto.descricao.length > 100
            ? `${produto.descricao.substring(0, 100)}...`
            : produto.descricao}
        </p>
      )}

      <span
        style={{
          display: "inline-block",
          padding: "5px 10px",
          borderRadius: "8px",
          background: status.bg,
          color: status.color,
          fontSize: "12px",
          fontWeight: "600"
        }}
      >
        {status.text}
      </span>

      <p style={{ color: c.textSecondary, marginTop: "8px" }}>{produto.categoria}</p>

      {!produto.ativo && (
        <p style={{ color: c.danger, fontWeight: "bold" }}>Indisponível</p>
      )}

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button
          type="button"
          style={{
            flex: 1,
            background: hovered === "edit" ? c.primaryHover : c.primary,
            color: "#fff",
            border: "none",
            padding: "8px",
            borderRadius: "8px",
            cursor: produto.ativo ? "pointer" : "not-allowed",
            opacity: produto.ativo ? 1 : 0.5
          }}
          onClick={() => produto.ativo && onEdit(produto)}
          onMouseEnter={() => setHovered("edit")}
          onMouseLeave={() => setHovered(null)}
          disabled={!produto.ativo}
        >
          Editar
        </button>

        <button
          type="button"
          style={{
            flex: 1,
            background: hovered === "delete" ? c.dangerHover : c.danger,
            color: "#fff",
            border: "none",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer"
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
