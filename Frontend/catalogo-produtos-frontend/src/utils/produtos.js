export function filtrarPorDisponibilidade(produtos, disponibilidade) {
  if (disponibilidade === "disponiveis") {
    return produtos.filter((p) => p.estoque > 0);
  }
  if (disponibilidade === "semEstoque") {
    return produtos.filter((p) => p.estoque === 0);
  }
  return produtos;
}

export function ordenarProdutos(items, ordenacao) {
  if (!ordenacao) return items;

  const copia = [...items];

  switch (ordenacao) {
    case "recentes":
      return copia.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    case "precoMaior":
      return copia.sort((a, b) => b.preco - a.preco);
    case "precoMenor":
      return copia.sort((a, b) => a.preco - b.preco);
    case "alfabetico":
      return copia.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    default:
      return copia;
  }
}
