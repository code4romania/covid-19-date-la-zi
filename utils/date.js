export function formatDate(date) {
  return new Date(date).toLocaleString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatShortDate(date) {
  return new Date(date).toLocaleString('ro-RO', { month: 'long', day: 'numeric' });
}

export function dateFromTimestamp(timestamp) {
  return new Date(timestamp * 1000);
}