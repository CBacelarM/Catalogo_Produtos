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
        <h2>{produtoEdit ? "Editar Produto" : "Novo Produto"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <input name="nome" placeholder="Nome*" value={form.nome} onChange={handleChange} />
          {errors.nome && <span>{errors.nome}</span>}

          <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />

          <input name="preco" type="number" placeholder="Preço*" value={form.preco} onChange={handleChange} />
          {errors.preco && <span>{errors.preco}</span>}

          <input name="estoque" type="number" placeholder="Estoque*" value={form.estoque} onChange={handleChange} />
          {errors.estoque && <span>{errors.estoque}</span>}

          <input name="categoria" placeholder="Categoria*" value={form.categoria} onChange={handleChange} />
          {errors.categoria && <span>{errors.categoria}</span>}

          <input name="imagemUrl" placeholder="URL da imagem" value={form.imagemUrl} onChange={handleChange} />

          {form.imagemUrl && (
            <img
              src={form.imagemUrl}
              alt="preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}

          <div style={styles.buttons}>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit">
              Salvar
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
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "400px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  }
};

export default ProductModal;