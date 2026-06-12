import { useTheme } from "../hooks/useTheme";
import { getThemeColors } from "../constants/theme";
import { CATEGORIAS } from "../constants/categorias";

function Header({
  busca,
  categoria,
  disponibilidade,
  ordenacao,
  onSearch,
  onCategoriaChange,
  onDisponibilidadeChange,
  onNewProduct,
  onOrderChange,
  onShowDashboard
}) {
  const { isDarkMode, toggleTheme } = useTheme();
  const c = getThemeColors(isDarkMode);

  const inputStyle = {
    padding: "8px",
    borderRadius: "8px",
    border: `1px solid ${c.border}`,
    background: c.bgCard,
    color: c.textPrimary,
    minWidth: "160px"
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px"
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "700", margin: 0, color: c.textPrimary }}>
          🏪 Catálogo de Produtos
        </h1>
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            background: isDarkMode ? c.bgTertiary : c.spinnerTrack,
            border: `1px solid ${c.borderStrong}`,
            fontSize: "14px",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: "6px",
            color: c.textPrimary,
            fontWeight: "600"
          }}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 4px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: "8px",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            placeholder="🔍 Buscar produtos..."
            value={busca}
            style={{ ...inputStyle, flex: 1 }}
            onChange={(e) => onSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={onNewProduct}
            style={{
              backgroundColor: c.primaryHover,
              color: "#fff",
              border: "none",
              padding: "7px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              whiteSpace: "nowrap"
            }}
          >
            + Novo Produto
          </button>
          <button
            type="button"
            onClick={onShowDashboard}
            style={{
              backgroundColor: isDarkMode ? c.successDark : c.successDark,
              color: "#fff",
              border: "none",
              padding: "7px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              whiteSpace: "nowrap"
            }}
          >
            📊 Dashboard
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(120px, 1fr))",
            gap: "8px",
            alignItems: "center"
          }}
        >
          <select
            value={categoria}
            style={{ ...inputStyle, minWidth: "130px" }}
            onChange={(e) => onCategoriaChange(e.target.value)}
          >
            <option value="">📁 Todas as Categorias</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={disponibilidade}
            style={{ ...inputStyle, minWidth: "130px" }}
            onChange={(e) => onDisponibilidadeChange(e.target.value)}
          >
            <option value="">📦 Todos os Produtos</option>
            <option value="disponiveis">Disponíveis</option>
            <option value="semEstoque">Sem Estoque</option>
          </select>

          <select
            value={ordenacao}
            style={{ ...inputStyle, minWidth: "130px" }}
            onChange={(e) => onOrderChange(e.target.value)}
          >
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

export default Header;
