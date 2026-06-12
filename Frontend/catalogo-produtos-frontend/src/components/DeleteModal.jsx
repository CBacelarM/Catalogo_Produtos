import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { getThemeColors } from "../constants/theme";
import Modal from "./Modal";

function DeleteModal({ isOpen, onClose, onConfirm, produto }) {
  const { isDarkMode } = useTheme();
  const c = getThemeColors(isDarkMode);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!produto) return;
    setLoading(true);
    try {
      await onConfirm(produto.id);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Exclusão"
      titleId="delete-modal-title"
      isDarkMode={isDarkMode}
      maxWidth="320px"
      closeOnOverlayClick={!loading}
    >
      <p style={{ color: c.textSecondary, textAlign: "center", margin: "0 0 20px" }}>
        Deseja excluir:
        <br />
        <strong style={{ color: c.textPrimary }}>{produto?.nome}</strong>?
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: `1px solid ${c.border}`,
            background: c.bgInput,
            color: c.textPrimary,
            cursor: loading ? "not-allowed" : "pointer"
          }}
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="button"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            background: c.danger,
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1
          }}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Excluindo..." : "Excluir"}
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
