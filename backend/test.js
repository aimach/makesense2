const groups = [
  { name: "Bijoux" },
  { name: "Livres" },
  { name: "Épicerie" },
  { name: "Santé" },
  { name: "Jeux" },
  { name: "Chaussures" },
  { name: "Livres" },
  { name: "Films" },
  { name: "Ordinateurs" },
  { name: "Films" },
];

const removeDuplicates = (array) => {
  console.log(typeof array[0]);
  if (typeof array[0] === "string") {
    return [...new Set(array)];
  } else if (typeof array[0] === "object") {
    const uniqueItems = [];
    array.filter((item) => {
      console.log(typeof item);
      if (typeof item !== "string") {
        const isDuplicate = uniqueItems.includes(item.name);
        if (!isDuplicate) {
          uniqueItems.push(item.name);
        }
      }
    });
    return uniqueItems.map((item) => {
      return {
        name: item,
      };
    });
  }
};

console.log(removeDuplicates(groups));
