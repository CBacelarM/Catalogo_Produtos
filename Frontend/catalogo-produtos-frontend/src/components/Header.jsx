import { useTheme } from "../contexts/ThemeContext";

function Header({ onSearch, onCategoriaChange, onDisponibilidadeChange, onNewProduct, onOrderChange }) {
  const { theme, isDark, toggleTheme } = useTheme();

  const styles = {
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
      fontSize: "24px",
      fontWeight: "bold",
      color: theme.text
    },
    themeButton: {
      background: theme.cardBackground,
      border: `1px solid ${theme.border}`,
      borderRadius: "8px",
      padding: "8px 12px",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: theme.text,
      transition: "all 0.2s ease"
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
      border: `1px solid ${theme.border}`,
      minWidth: "200px",
      background: theme.inputBackground,
      color: theme.text
    },
    select: {
      padding: "10px",
      borderRadius: "8px",
      border: `1px solid ${theme.border}`,
      flex: 1,
      minWidth: "150px",
      background: theme.inputBackground,
      color: theme.text
    },
    button: {
      backgroundColor: theme.primary,
      color: "#fff",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      whiteSpace: "nowrap"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerTop}>
        <h1 style={styles.title}>Catalogo de Produtos</h1>
        <button 
          onClick={toggleTheme} 
          style={styles.themeButton}
          aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
        >
          {isDark ? "Modo Claro" : "Modo Escuro"}
        </button>
      </div>

      <div style={styles.actions}>
        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            style={styles.input}
            onChange={(e) => onSearch(e.target.value)}
          />
          <button onClick={onNewProduct} style={styles.button}>
          + Novo Produto
          </button>
        </div>

        <div style={styles.filterRow}>
          <select style={styles.select} onChange={(e) => onCategoriaChange(e.target.value)}>
            <option value="">Todas as Categorias</option>
            <option value="Eletrônicos">Eletronicos</option>
            <option value="Roupas">Roupas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Casa">Casa</option>
            <option value="Esportes">Esportes</option>
            <option value="Outros">Outros</option>
          </select>

          <select style={styles.select} onChange={(e) => onDisponibilidadeChange(e.target.value)}>
            <option value="">Todos os Produtos</option>
            <option value="disponiveis">Disponiveis</option>
            <option value="semEstoque">Sem Estoque</option>
          </select>

          <select style={styles.select} onChange={(e) => onOrderChange(e.target.value)}>
            <option value="">Ordenar por</option>
            <option value="recentes">Mais Recentes</option>
            <option value="precoMaior">Preco: Maior primeiro</option>
            <option value="precoMenor">Preco: Menor primeiro</option>
            <option value="alfabetico">Ordem Alfabetica</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
