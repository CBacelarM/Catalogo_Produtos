import { useTheme } from "../contexts/ThemeContext";

function DeleteModal({ isOpen, onClose, onConfirm, produto }) {
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  const styles = getStyles(isDarkMode);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Confirmar Exclusão</h2>

        <p style={styles.text}>
          Deseja excluir:
          <br />
          <strong>{produto?.nome}</strong>?
        </p>

        <div style={styles.buttons}>
          <button style={styles.btnCancel} onClick={onClose}>
            Cancelar
          </button>

          <button style={styles.btnDelete} onClick={() => onConfirm(produto.id)}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

const getStyles = (isDarkMode) => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: isDarkMode ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: isDarkMode ? "#1F2937" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    padding: "20px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center"
  },
  title: {
    marginTop: 0,
    marginBottom: "15px",
    color: isDarkMode ? "#F9FAFB" : "#111827"
  },
  text: {
    color: isDarkMode ? "#9CA3AF" : "#6B7280"
  },
  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },
  btnCancel: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${isDarkMode ? "#374151" : "#ccc"}`,
    background: isDarkMode ? "#374151" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    cursor: "pointer"
  },
  btnDelete: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    background: "#EF4444",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
});

export default DeleteModal;