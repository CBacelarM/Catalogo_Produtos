function Header({ onSearch, onCategoriaChange, onNewProduct }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏪 Catálogo de Produtos</h1>

      <div style={styles.actions}>
        <input
          type="text"
          placeholder="🔍 Buscar produtos..."
          style={styles.input}
          onChange={(e) => onSearch(e.target.value)}
        />

        <select style={styles.select} onChange={(e) => onCategoriaChange(e.target.value)}>
          <option value="">📁 Todas as Categorias</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Roupas">Roupas</option>
          <option value="Alimentos">Alimentos</option>
        </select>

        <button onClick={onNewProduct} style={styles.button}>
        + Novo Produto
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "20px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    minWidth: "200px"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB"
  },
  button: {
    backgroundColor: "#3B82F6",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Header;