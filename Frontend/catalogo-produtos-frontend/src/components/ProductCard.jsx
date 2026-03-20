function ProductCard({ produto, onEdit }) {
  const estoque = produto.estoque;

  let status = {
    text: "",
    bg: "",
    color: ""
  };

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
      width: "250px",
      transition: "0.2s",
      opacity: produto.ativo ? 1 : 0.6
    }}>
      <img
        src={produto.imagemUrl || "https://picsum.photos/300/200"}
        alt={produto.nome}
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      />

      <h3>{produto.nome}</h3>

      <p style={{ fontWeight: "bold", fontSize: "18px" }}>
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

      <button onClick={() => onEdit(produto)}>
        ✏️ Editar
      </button>
    </div>
  );
}

export default ProductCard;