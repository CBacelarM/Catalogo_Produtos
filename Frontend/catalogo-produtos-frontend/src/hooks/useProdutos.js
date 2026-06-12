import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useDebounce } from "./useDebounce";
import { filtrarPorDisponibilidade, ordenarProdutos } from "../utils/produtos";

const ITEMS_PER_PAGE = 8;

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const buscaDebounced = useDebounce(busca, 300);

  const loadProdutos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/produtos", {
        params: {
          nome: buscaDebounced || undefined,
          categoria: categoria || undefined
        }
      });
      setProdutos(res.data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os produtos. Verifique se a API está rodando.");
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  }, [buscaDebounced, categoria]);

  useEffect(() => {
    loadProdutos();
  }, [loadProdutos]);

  const setBuscaComReset = useCallback((value) => {
    setBusca(value);
    setCurrentPage(1);
  }, []);

  const setCategoriaComReset = useCallback((value) => {
    setCategoria(value);
    setCurrentPage(1);
  }, []);

  const setDisponibilidadeComReset = useCallback((value) => {
    setDisponibilidade(value);
    setCurrentPage(1);
  }, []);

  const produtosFiltrados = useMemo(
    () => ordenarProdutos(filtrarPorDisponibilidade(produtos, disponibilidade), ordenacao),
    [produtos, disponibilidade, ordenacao]
  );

  const totalPages = Math.ceil(produtosFiltrados.length / ITEMS_PER_PAGE);

  const produtosPaginados = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return produtosFiltrados.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [produtosFiltrados, currentPage]);

  const confirmDelete = useCallback(async (id) => {
    await api.delete(`/produtos/${id}`);
    await loadProdutos();
  }, [loadProdutos]);

  return {
    produtos,
    produtosFiltrados,
    produtosPaginados,
    busca,
    categoria,
    disponibilidade,
    ordenacao,
    loading,
    error,
    currentPage,
    totalPages,
    setOrdenacao,
    setBusca: setBuscaComReset,
    setCategoria: setCategoriaComReset,
    setDisponibilidade: setDisponibilidadeComReset,
    setCurrentPage,
    loadProdutos,
    confirmDelete
  };
}
