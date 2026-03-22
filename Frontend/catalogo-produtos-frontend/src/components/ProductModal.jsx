import { useState, useEffect } from "react";
import api from "../services/api";
import { useTheme } from "../contexts/ThemeContext";

function ProductModal({ isOpen, onClose, onCreated, produtoEdit }) {
  const { isDarkMode } = useTheme();
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
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
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
      setImageError(false);
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
      setImageError(false);
    }
  }, [produtoEdit]);

  useEffect(() => {
    if (isOpen && !produtoEdit) {
      setForm({
        nome: "",
        descricao: "",
        preco: "",
        estoque: "",
        categoria: "",
        imagemUrl: "",
        ativo: true
      });
      setErrors({});
      setImageError(false);
    }
  }, [isOpen, produtoEdit]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "imagemUrl") {
      setImageError(false);
    }
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

    setLoading(true);
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
      alert("Erro ao salvar produto. Tente novamente.");
    } finally {
      setLoading(false);
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
            <div style={styles.imagePreviewContainer}>
              {!imageError ? (
                <img
                  src={form.imagemUrl}
                  alt="preview"
                  onError={() => setImageError(true)}
                  style={styles.imagePreview}
                />
              ) : (
                <div style={styles.imageErrorPlaceholder}>
                  <span style={styles.imageErrorText}>❌ Erro ao carregar imagem</span>
                  <small style={styles.imageErrorSubtext}>Verifique a URL</small>
                </div>
              )}
            </div>
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

            <button type="submit" style={styles.saveButton} disabled={loading}>
              {loading ? "Salvando..." : "Salvar Produto"}
            </button>
          </div>
        </form>
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
    position: "relative",
    background: isDarkMode ? "#1F2937" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
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
    border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
    background: isDarkMode ? "#374151" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    width: "100%",
    boxSizing: "border-box"
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
    background: isDarkMode ? "#374151" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    width: "100%",
    minHeight: "80px",
    boxSizing: "border-box"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
    background: isDarkMode ? "#374151" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    width: "100%",
    boxSizing: "border-box"
  },
  rowGroup: {
    display: "flex",
    gap: "10px"
  },
  inputHalf: {
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
    background: isDarkMode ? "#374151" : "#fff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
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
    color: isDarkMode ? "#9CA3AF" : "#6B7280"
  },
  title: {
    marginTop: 0,
    marginBottom: "15px",
    color: isDarkMode ? "#F9FAFB" : "#111827"
  },
  error: {
    color: "#DC2626",
    fontSize: "12px"
  },
  cancelButton: {
    flex: 1,
    background: isDarkMode ? "#6B7280" : "#9CA3AF",
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
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: isDarkMode ? "#F9FAFB" : "#111827"
  },
  imagePreviewContainer: {
    width: "100%",
    height: "200px",
    borderRadius: "8px",
    border: `2px dashed ${isDarkMode ? "#4B5563" : "#D1D5DB"}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    background: isDarkMode ? "#111827" : "#F3F4F6",
    overflow: "hidden"
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    borderRadius: "6px"
  },
  imageErrorPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    color: "#EF4444"
  },
  imageErrorText: {
    fontSize: "16px",
    fontWeight: "600"
  },
  imageErrorSubtext: {
    fontSize: "12px",
    color: "#9CA3AF"
  }
});

export default ProductModal;