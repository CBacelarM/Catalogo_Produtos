import { useState } from "react";
import api from "../services/api";

function ProductModal({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    categoria: "",
    imagemUrl: ""
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    let newErrors = {};

    if (!form.nome) newErrors.nome = "Nome é obrigatório";
    if (form.nome.length > 100) newErrors.nome = "Máx 100 caracteres";

    if (!form.preco || form.preco <= 0)
      newErrors.preco = "Preço deve ser maior que 0";

    if (form.estoque === "" || form.estoque < 0)
      newErrors.estoque = "Estoque não pode ser negativo";

    if (!form.categoria)
      newErrors.categoria = "Categoria obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await api.post("/produtos", {
        ...form,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        ativo: true
      });

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Novo Produto</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <input name="nome" placeholder="Nome*" onChange={handleChange} />
          {errors.nome && <span>{errors.nome}</span>}

          <textarea name="descricao" placeholder="Descrição" onChange={handleChange} />

          <input name="preco" type="number" placeholder="Preço*" onChange={handleChange} />
          {errors.preco && <span>{errors.preco}</span>}

          <input name="estoque" type="number" placeholder="Estoque*" onChange={handleChange} />
          {errors.estoque && <span>{errors.estoque}</span>}

          <input name="categoria" placeholder="Categoria*" onChange={handleChange} />
          {errors.categoria && <span>{errors.categoria}</span>}

          <input name="imagemUrl" placeholder="URL da imagem" onChange={handleChange} />

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