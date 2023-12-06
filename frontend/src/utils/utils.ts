export const JSDateToNormalDate = (date: Date): string => {
  return date.toLocaleDateString().split("/").reverse().join("-");
};
