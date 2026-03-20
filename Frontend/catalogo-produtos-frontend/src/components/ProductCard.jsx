function ProductCard({ produto, onEdit, onDelete }) {
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
      opacity: produto.ativo ? 1 : 0.6
    }}>
      <img
        src={produto.imagemUrl || "https://picsum.photos/300/200"}
        alt={produto.nome}
        style={{ width: "100%", borderRadius: "8px" }}
      />

      <h3>{produto.nome}</h3>

      <p><strong>R$ {produto.preco}</strong></p>

      <span style={{
        background: status.bg,
        color: status.color,
        padding: "5px 10px",
        borderRadius: "8px"
      }}>
        {status.text}
      </span>

      <p>{produto.categoria}</p>

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={() => onEdit(produto)}>
          ✏️ Editar
        </button>

        <button onClick={() => onDelete(produto)}>
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}

export default ProductCard;