const removeDuplicates = (array: string[]): string[] => {
  return [...new Set(array)];
};

export { removeDuplicates };
