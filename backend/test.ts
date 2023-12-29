// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require("@faker-js/faker");

const amountOfServices = 5;

const serviceArray = faker.helpers.multiple(faker.company.buzzNoun, {
  count: amountOfServices,
});

console.log(serviceArray);
