import { useTheme } from "../contexts/ThemeContext";

function Header({ onSearch, onCategoriaChange, onDisponibilidadeChange, onNewProduct, onOrderChange, onShowDashboard }) {
  const { isDarkMode, toggleTheme } = useTheme();

  const styles = getStyles(isDarkMode);

  return (
    <div style={styles.container}>
      <div style={styles.headerTop}>
        <h1 style={styles.title}>🏪 Catálogo de Produtos</h1>
        <button onClick={toggleTheme} style={styles.themeButton}>
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

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
          <button onClick={onShowDashboard} style={styles.dashboardButton}>
          📊 Dashboard
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
          </select>

          <select style={styles.select} onChange={(e) => onDisponibilidadeChange(e.target.value)}>
            <option value="">📦 Todos os Produtos</option>
            <option value="disponiveis">Disponíveis</option>
            <option value="semEstoque">Sem Estoque</option>
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

const getStyles = (isDarkMode) => ({
  container: {
    marginBottom: "20px"
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    margin: 0,
    color: isDarkMode ? "#F9FAFB" : "#111827"
  },
  themeButton: {
    background: isDarkMode ? "#374151" : "#E5E7EB",
    border: "1px solid" + (isDarkMode ? " #4B5563" : " #D1D5DB"),
    fontSize: "14px",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "background 0.2s, transform 0.1s",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    fontWeight: "600"
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "0 4px"
  },
  searchRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    gap: "8px",
    alignItems: "center"
  },
  filterRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(120px, 1fr))",
    gap: "8px",
    alignItems: "center"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
    background: isDarkMode ? "#1F2937" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    minWidth: "160px"
  },
  select: {
    padding: "8px",
    borderRadius: "8px",
    border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
    background: isDarkMode ? "#1F2937" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    minWidth: "130px"
  },
  button: {
    backgroundColor: "#2563EB",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    whiteSpace: "nowrap"
  },
  dashboardButton: {
    backgroundColor: isDarkMode ? "#047857" : "#059669",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    whiteSpace: "nowrap"
  }
});

export default Header;