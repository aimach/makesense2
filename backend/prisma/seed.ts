// app/prisma/seed.ts
import { PrismaClient, User } from "@prisma/client";
import { fakerFR as faker } from "@faker-js/faker";
import { removeDuplicates } from "../utils/utils";
import { UserType } from "../utils/types";

const prisma = new PrismaClient();

async function main() {
  // DELETE BEFORE CREATING
  await prisma.user.deleteMany({}); // use with caution.
  await prisma.service.deleteMany({}); // use with caution.

  // SERVICES
  const amountOfServices = 5;

  const services = [];
  for (let i = 0; i < amountOfServices; i++) {
    services.push(faker.company.buzzNoun());
  }
  removeDuplicates(services);

  try {
    await Promise.all(
      services.map(async (service) => {
        await prisma.service.create({
          data: {
            name: service,
          },
        });
      })
    );
  } catch (error) {
    console.error(error);
  }

  // USERS
  const amountOfUsers = 5;

  const getRandomServiceId = async () => {
    const allServices = await prisma.service.findMany();
    return allServices[Math.floor(Math.random() * allServices.length)].id;
  };
  const createUsers = async (): Promise<UserType> => {
    // INITIALIZE REUSED DATAS
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const serviceId = await getRandomServiceId();

    // CREATE NEW USER
    const newUser: UserType = {
      firstname: firstname,
      lastname: lastname,
      email: faker.internet.email({
        firstName: firstname,
        lastName: lastname,
        provider: "makesense.com",
      }),
      password: faker.internet.password(), // A FINIR
      avatar: faker.internet.avatar(),
      admin: faker.datatype.boolean({ probability: 0.2 }),
      position: faker.company.buzzNoun(),
      serviceId: serviceId,
    };

    return newUser;
  };

  const users: UserType[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    users.push(await createUsers());
  }

  try {
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({
          data: user,
        });
      })
    );
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
