import { useState, useEffect } from "react";
import api from "../services/api";

function ProductModal({ isOpen, onClose, onCreated, produtoEdit }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    categoria: "",
    imagemUrl: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (produtoEdit) {
      setForm({
        nome: produtoEdit.nome || "",
        descricao: produtoEdit.descricao || "",
        preco: produtoEdit.preco || "",
        estoque: produtoEdit.estoque || "",
        categoria: produtoEdit.categoria || "",
        imagemUrl: produtoEdit.imagemUrl || ""
      });
    } else {
      setForm({
        nome: "",
        descricao: "",
        preco: "",
        estoque: "",
        categoria: "",
        imagemUrl: ""
      });
    }
  }, [produtoEdit]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function validate() {
    let newErrors = {};

    if (!form.nome) newErrors.nome = "Nome é obrigatório";
    if (form.nome.length > 100) newErrors.nome = "Máx 100 caracteres";

    if (!form.preco || form.preco <= 0)
      newErrors.preco = "Preço deve ser maior que 0";

    if (form.estoque === "" || form.estoque < 0)
      newErrors.estoque = "Estoque inválido";

    if (!form.categoria)
      newErrors.categoria = "Categoria obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (produtoEdit) {
        await api.put(`/produtos/${produtoEdit.id}`, {
          id: produtoEdit.id,
          ...form,
          preco: Number(form.preco),
          estoque: Number(form.estoque),
          ativo: true
        });
      } else {
        await api.post("/produtos", {
          ...form,
          preco: Number(form.preco),
          estoque: Number(form.estoque),
          ativo: true
        });
      }

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button type="button" style={styles.closeButton} onClick={onClose} aria-label="Fechar">×</button>
        <h2 style={styles.title}>{produtoEdit ? "Editar Produto" : "Novo Produto"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <input name="nome" placeholder="Nome*" value={form.nome} onChange={handleChange} style={styles.input} />
          {errors.nome && <span style={styles.error}>{errors.nome}</span>}

          <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} style={styles.textarea} />

          <div style={styles.rowGroup}>
            <div>
              <input name="preco" type="number" placeholder="Preço*" value={form.preco} onChange={handleChange} style={styles.inputHalf} />
              {errors.preco && <span style={styles.error}>{errors.preco}</span>}
            </div>

            <div>
              <input name="estoque" type="number" placeholder="Estoque*" value={form.estoque} onChange={handleChange} style={styles.inputHalf} />
              {errors.estoque && <span style={styles.error}>{errors.estoque}</span>}
            </div>
          </div>

          <select name="categoria" value={form.categoria} onChange={handleChange} style={styles.select}>
            <option value="">Selecione uma categoria*</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Roupas">Roupas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Casa">Casa</option>
            <option value="Esportes">Esportes</option>
            <option value="Outros">Outros</option>
          </select>
          {errors.categoria && <span style={styles.error}>{errors.categoria}</span>}

          <input name="imagemUrl" placeholder="URL da imagem" value={form.imagemUrl} onChange={handleChange} style={styles.input} />

          {form.imagemUrl && (
            <img
              src={form.imagemUrl}
              alt="preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}

          <div style={styles.buttons}>
            <button type="button" style={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" style={styles.saveButton}>
              Salvar Produto
            </button>
          </div>
        </form>
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
    position: "relative",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    width: "100%",
    boxSizing: "border-box"
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    width: "100%",
    minHeight: "80px",
    boxSizing: "border-box"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    width: "100%",
    background: "#fff",
    boxSizing: "border-box"
  },
  rowGroup: {
    display: "flex",
    gap: "10px"
  },
  inputHalf: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    width: "100%",
    boxSizing: "border-box"
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "transparent",
    fontSize: "32px",
    cursor: "pointer",
    color: "#6B7280"
  },
  title: {
    marginTop: 0,
    marginBottom: "15px"
  },
  error: {
    color: "#DC2626",
    fontSize: "12px"
  },
  cancelButton: {
    flex: 1,
    background: "#9CA3AF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  saveButton: {
    flex: 1,
    background: "#10B981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  }
};

export default ProductModal;