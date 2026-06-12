import { useState } from "react";
import api from "../services/api";
import { useTheme } from "../hooks/useTheme";
import { useToast } from "../hooks/useToast";
import { getThemeColors } from "../constants/theme";
import { CATEGORIAS } from "../constants/categorias";
import Modal from "./Modal";

const EMPTY_FORM = {
  nome: "",
  descricao: "",
  preco: "",
  estoque: "",
  categoria: "",
  imagemUrl: "",
  ativo: true
};

function buildFormFromProduto(produtoEdit) {
  if (!produtoEdit) return EMPTY_FORM;
  return {
    nome: produtoEdit.nome || "",
    descricao: produtoEdit.descricao || "",
    preco: produtoEdit.preco ?? "",
    estoque: produtoEdit.estoque ?? "",
    categoria: produtoEdit.categoria || "",
    imagemUrl: produtoEdit.imagemUrl || "",
    ativo: produtoEdit.ativo !== undefined ? produtoEdit.ativo : true
  };
}

function ProductModal({ isOpen, onClose, onCreated, produtoEdit }) {
  if (!isOpen) return null;

  return (
    <ProductModalContent
      key={produtoEdit?.id ?? "new"}
      produtoEdit={produtoEdit}
      onClose={onClose}
      onCreated={onCreated}
    />
  );
}

function ProductModalContent({ produtoEdit, onClose, onCreated }) {
  const { isDarkMode } = useTheme();
  const { showToast } = useToast();
  const c = getThemeColors(isDarkMode);

  const [form, setForm] = useState(() => buildFormFromProduto(produtoEdit));
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "imagemUrl") setImageError(false);
  }

  function validate() {
    const newErrors = {};

    if (!form.nome) newErrors.nome = "Nome é obrigatório";
    if (form.nome.length > 100) newErrors.nome = "Máx 100 caracteres";
    if (!form.preco || form.preco <= 0) newErrors.preco = "Preço deve ser maior que 0";
    if (form.estoque === "" || form.estoque < 0) newErrors.estoque = "Estoque inválido";
    if (!form.categoria) newErrors.categoria = "Categoria obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        ativo: form.ativo
      };

      if (produtoEdit) {
        await api.put(`/produtos/${produtoEdit.id}`, { id: produtoEdit.id, ...payload });
        showToast("Produto atualizado com sucesso.", "success");
      } else {
        await api.post("/produtos", payload);
        showToast("Produto criado com sucesso.", "success");
      }

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      showToast("Erro ao salvar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${c.border}`,
    background: c.bgInput,
    color: c.textPrimary,
    width: "100%",
    boxSizing: "border-box"
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={produtoEdit ? "Editar Produto" : "Novo Produto"}
      titleId="product-modal-title"
      isDarkMode={isDarkMode}
    >
      <button
        type="button"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "transparent",
          fontSize: "32px",
          cursor: "pointer",
          color: c.textSecondary
        }}
        onClick={onClose}
        aria-label="Fechar"
      >
        ×
      </button>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="nome" placeholder="Nome*" value={form.nome} onChange={handleChange} style={inputStyle} />
        {errors.nome && <span style={{ color: c.danger, fontSize: "12px" }}>{errors.nome}</span>}

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: "80px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <input name="preco" type="number" placeholder="Preço*" value={form.preco} onChange={handleChange} style={inputStyle} />
            {errors.preco && <span style={{ color: c.danger, fontSize: "12px" }}>{errors.preco}</span>}
          </div>
          <div style={{ flex: 1 }}>
            <input name="estoque" type="number" placeholder="Estoque*" value={form.estoque} onChange={handleChange} style={inputStyle} />
            {errors.estoque && <span style={{ color: c.danger, fontSize: "12px" }}>{errors.estoque}</span>}
          </div>
        </div>

        <select name="categoria" value={form.categoria} onChange={handleChange} style={inputStyle}>
          <option value="">Selecione uma categoria*</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.categoria && <span style={{ color: c.danger, fontSize: "12px" }}>{errors.categoria}</span>}

        <input name="imagemUrl" placeholder="URL da imagem" value={form.imagemUrl} onChange={handleChange} style={inputStyle} />

        {form.imagemUrl && (
          <div
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "8px",
              border: `2px dashed ${c.borderStrong}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: isDarkMode ? c.bgPrimary : c.bgTertiary,
              overflow: "hidden"
            }}
          >
            {!imageError ? (
              <img
                src={form.imagemUrl}
                alt="Preview"
                onError={() => setImageError(true)}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "6px" }}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: c.danger }}>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>❌ Erro ao carregar imagem</span>
                <small style={{ fontSize: "12px", color: c.textMuted }}>Verifique a URL</small>
              </div>
            )}
          </div>
        )}

        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: c.textPrimary }}>
          <input
            type="checkbox"
            checked={form.ativo}
            onChange={(e) => setForm((prev) => ({ ...prev, ativo: e.target.checked }))}
          />
          Produto ativo
        </label>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            type="button"
            style={{ flex: 1, background: c.textMuted, color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontWeight: "bold", cursor: "pointer" }}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{ flex: 1, background: c.success, color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Produto"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductModal;
