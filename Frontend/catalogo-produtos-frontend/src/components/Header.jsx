function Header({ onSearch, onCategoriaChange, onNewProduct, onOrderChange }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏪 Catálogo de Produtos</h1>

      <div style={styles.actions}>
        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder="🔍 Buscar produtos..."
            style={styles.input}
            onChange={(e) => onSearch(e.target.value)}
          />
          <button onClick={onNewProduct} style={styles.button}>
          + Novo Produto
          </button>
        </div>

        <div style={styles.filterRow}>
          <select style={styles.select} onChange={(e) => onCategoriaChange(e.target.value)}>
            <option value="">📁 Todas as Categorias</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Roupas">Roupas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Casa">Casa</option>
            <option value="Esportes">Esportes</option>
            <option value="Outros">Outros</option>
          </select>

          <select style={styles.select} onChange={(e) => onOrderChange(e.target.value)}>
            <option value="">📊 Ordenar por</option>
            <option value="recentes">Mais Recentes</option>
            <option value="precoMaior">Preço: Maior primeiro</option>
            <option value="precoMenor">Preço: Menor primeiro</option>
            <option value="alfabetico">Ordem Alfabética</option>
          </select>
        </div>
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
    flexDirection: "column",
    gap: "10px"
  },
  searchRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    minWidth: "200px"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    flex: 1,
    minWidth: "150px"
  },
  button: {
    backgroundColor: "#3B82F6",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    whiteSpace: "nowrap"
  }
};

export default Header;