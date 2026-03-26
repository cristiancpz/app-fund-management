export const formatMoney = (value: number | string) => {
  if (Number.isNaN(value)) {
    return '$ 0';
  }

  return '$' + value.toLocaleString('es-CO');
}
