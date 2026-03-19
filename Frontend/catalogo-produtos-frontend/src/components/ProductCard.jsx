function ProductCard({ produto }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "8px",
      width: "200px"
    }}>
      <img
        src={produto.imagemUrl}
        alt={produto.nome}
        style={{ width: "100%", height: "120px", objectFit: "cover" }}
      />

      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco}</p>
      <p>Estoque: {produto.estoque}</p>

      {produto.estoque < 10 && (
        <span style={{ color: "red" }}>⚠ Estoque baixo</span>
      )}

      {!produto.ativo && (
        <span style={{ color: "gray" }}>Indisponível</span>
      )}
    </div>
  );
}

export default ProductCard;