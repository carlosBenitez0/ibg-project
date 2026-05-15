export const useUtils = () => {
  const getNowDate = () => {
    const now = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date());
    return now;
  };
  return { getNowDate };
};
