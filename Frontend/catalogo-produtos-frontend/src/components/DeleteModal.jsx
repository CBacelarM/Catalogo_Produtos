function DeleteModal({ isOpen, onClose, onConfirm, produto }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Confirmar Exclusão</h2>

        <p>
          Tem certeza que deseja excluir:
          <br />
          <strong>{produto?.nome}</strong>?
        </p>

        <div style={styles.buttons}>
          <button onClick={onClose}>
            Cancelar
          </button>

          <button onClick={() => onConfirm(produto.id)}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    textAlign: "center"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px"
  }
};

export default DeleteModal;