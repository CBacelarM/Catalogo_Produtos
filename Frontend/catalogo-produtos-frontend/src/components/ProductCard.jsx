function ProductCard({ produto, onEdit, onDelete }) {
  const estoque = produto.estoque;

  let status = {};

  if (estoque === 0) {
    status = {
      text: "❌ Sem estoque",
      bg: "#FEE2E2",
      color: "#991B1B"
    };
  } else if (estoque < 10) {
    status = {
      text: `⚠ Apenas ${estoque} unidades`,
      bg: "#FEF3C7",
      color: "#92400E"
    };
  } else {
    status = {
      text: `✅ ${estoque} unidades`,
      bg: "#D1FAE5",
      color: "#065F46"
    };
  }

  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #E5E7EB",
      borderRadius: "12px",
      padding: "16px",
      transition: "0.2s",
      cursor: "pointer",
      opacity: produto.ativo ? 1 : 0.6
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
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
        R$ {produto.preco}
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
        <button style={btnEdit} onClick={() => onEdit(produto)}>
          Editar
        </button>

        <button style={btnDelete} onClick={() => onDelete(produto)}>
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

export default ProductCard;