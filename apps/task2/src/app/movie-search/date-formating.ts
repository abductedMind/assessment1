export function formatDateByLang(dateStr: Date) {
  const date = new Date(dateStr);
  let result;
  try {
    result = new Intl.DateTimeFormat(navigator.language, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date);
  } catch (e) {
    result = `n/a`;
  }
  return result;
}
