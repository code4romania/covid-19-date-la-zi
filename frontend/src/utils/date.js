export function formatDate(date) {
  return new Date(date).toLocaleString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}