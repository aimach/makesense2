const date = new Date();

const JSDateToNormalDate = (date) => {
  return date.toLocaleDateString().split("/").reverse().join("-");
};

console.log(JSDateToNormalDate(date));
