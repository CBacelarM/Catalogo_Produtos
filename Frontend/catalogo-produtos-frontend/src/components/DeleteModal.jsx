import { useTheme } from "../contexts/ThemeContext";

function DeleteModal({ isOpen, onClose, onConfirm, produto }) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: theme.overlay,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const modal = {
    background: theme.cardBackground,
    padding: "20px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    color: theme.text,
    border: `1px solid ${theme.border}`
  };

  const buttons = {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  };

  const btnCancel = {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${theme.border}`,
    cursor: "pointer",
    background: theme.inputBackground,
    color: theme.text
  };

  const btnDelete = {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    background: theme.danger,
    color: "#fff",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ color: theme.text }}>Confirmar Exclusao</h2>

        <p style={{ color: theme.textSecondary }}>
          Deseja excluir:
          <br />
          <strong style={{ color: theme.text }}>{produto?.nome}</strong>?
        </p>

        <div style={buttons}>
          <button style={btnCancel} onClick={onClose}>
            Cancelar
          </button>

          <button style={btnDelete} onClick={() => onConfirm(produto.id)}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
