import { useState, useEffect } from "react";
import api from "../services/api";
import { useTheme } from "../contexts/ThemeContext";

function ProductModal({ isOpen, onClose, onCreated, produtoEdit }) {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    categoria: "",
    imagemUrl: "",
    ativo: true
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
        imagemUrl: produtoEdit.imagemUrl || "",
        ativo: produtoEdit.ativo !== undefined ? produtoEdit.ativo : true
      });
    } else {
      setForm({
        nome: "",
        descricao: "",
        preco: "",
        estoque: "",
        categoria: "",
        imagemUrl: "",
        ativo: true
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

    if (!form.nome) newErrors.nome = "Nome e obrigatorio";
    if (form.nome.length > 100) newErrors.nome = "Max 100 caracteres";

    if (!form.preco || form.preco <= 0)
      newErrors.preco = "Preco deve ser maior que 0";

    if (form.estoque === "" || form.estoque < 0)
      newErrors.estoque = "Estoque invalido";

    if (!form.categoria)
      newErrors.categoria = "Categoria obrigatoria";

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
          ativo: form.ativo
        });
      } else {
        await api.post("/produtos", {
          ...form,
          preco: Number(form.preco),
          estoque: Number(form.estoque),
          ativo: form.ativo
        });
      }

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  const styles = {
    overlay: {
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
    },
    modal: {
      position: "relative",
      background: theme.cardBackground,
      padding: "20px",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "500px",
      color: theme.text,
      border: `1px solid ${theme.border}`
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    },
    input: {
      padding: "10px",
      borderRadius: "8px",
      border: `1px solid ${theme.border}`,
      width: "100%",
      boxSizing: "border-box",
      background: theme.inputBackground,
      color: theme.text
    },
    textarea: {
      padding: "10px",
      borderRadius: "8px",
      border: `1px solid ${theme.border}`,
      width: "100%",
      minHeight: "80px",
      boxSizing: "border-box",
      background: theme.inputBackground,
      color: theme.text
    },
    select: {
      padding: "10px",
      borderRadius: "8px",
      border: `1px solid ${theme.border}`,
      width: "100%",
      background: theme.inputBackground,
      boxSizing: "border-box",
      color: theme.text
    },
    rowGroup: {
      display: "flex",
      gap: "10px"
    },
    inputHalf: {
      padding: "10px",
      borderRadius: "8px",
      border: `1px solid ${theme.border}`,
      width: "100%",
      boxSizing: "border-box",
      background: theme.inputBackground,
      color: theme.text
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      border: "none",
      background: "transparent",
      fontSize: "32px",
      cursor: "pointer",
      color: theme.textSecondary
    },
    title: {
      marginTop: 0,
      marginBottom: "15px",
      color: theme.text
    },
    error: {
      color: theme.danger,
      fontSize: "12px"
    },
    cancelButton: {
      flex: 1,
      background: theme.textMuted,
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "12px",
      fontWeight: "bold",
      cursor: "pointer"
    },
    saveButton: {
      flex: 1,
      background: theme.success,
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
      marginTop: "10px",
      gap: "10px"
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: theme.text
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button type="button" style={styles.closeButton} onClick={onClose} aria-label="Fechar">x</button>
        <h2 style={styles.title}>{produtoEdit ? "Editar Produto" : "Novo Produto"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <input name="nome" placeholder="Nome*" value={form.nome} onChange={handleChange} style={styles.input} />
          {errors.nome && <span style={styles.error}>{errors.nome}</span>}

          <textarea name="descricao" placeholder="Descricao" value={form.descricao} onChange={handleChange} style={styles.textarea} />

          <div style={styles.rowGroup}>
            <div style={{ flex: 1 }}>
              <input name="preco" type="number" placeholder="Preco*" value={form.preco} onChange={handleChange} style={styles.inputHalf} />
              {errors.preco && <span style={styles.error}>{errors.preco}</span>}
            </div>

            <div style={{ flex: 1 }}>
              <input name="estoque" type="number" placeholder="Estoque*" value={form.estoque} onChange={handleChange} style={styles.inputHalf} />
              {errors.estoque && <span style={styles.error}>{errors.estoque}</span>}
            </div>
          </div>

          <select name="categoria" value={form.categoria} onChange={handleChange} style={styles.select}>
            <option value="">Selecione uma categoria*</option>
            <option value="Eletrônicos">Eletronicos</option>
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
              style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
            />
          )}

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={form.ativo}
              onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
            />
            Produto ativo
          </label>

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

export default ProductModal;
