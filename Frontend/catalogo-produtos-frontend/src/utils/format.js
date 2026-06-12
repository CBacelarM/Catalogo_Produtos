export const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const pluralize = (count, singular, plural) =>
  count === 1 ? singular : plural;
