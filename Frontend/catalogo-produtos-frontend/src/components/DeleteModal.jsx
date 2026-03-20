function DeleteModal({ isOpen, onClose, onConfirm, produto }) {
  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Confirmar Exclusão</h2>

        <p>
          Deseja excluir:
          <br />
          <strong>{produto?.nome}</strong>?
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

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "320px",
  textAlign: "center"
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
  border: "1px solid #ccc",
  cursor: "pointer"
};

const btnDelete = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  background: "#EF4444",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

export default DeleteModal;