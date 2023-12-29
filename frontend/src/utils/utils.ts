export const JSDateToNormalDate = (date: Date): string => {
  return date.toLocaleDateString().split("/").reverse().join("-");
};

export const NormalDateToJSDate = (date: string): Date => {
  return new Date(date);
};
