export const compareDates = (data1: Date, data2: Date | null) => {
  if (!data2) {
    return false;
  }

  return (
    data1.getFullYear() === data2.getFullYear() &&
    data1.getMonth() === data2.getMonth() &&
    data1.getDate() === data2.getDate()
  );
};
