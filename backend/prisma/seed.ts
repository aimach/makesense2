// app/prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { fakerFR as faker } from "@faker-js/faker";
import {
  removeDuplicates,
  getRandomUserId,
  getRandomStatusId,
  getRandomServiceId,
  getRandomDecisionId,
} from "../utils/utils";
import {
  CommentType,
  DecisionType,
  StatusType,
  UserType,
} from "../utils/types";

const prisma = new PrismaClient();

async function main() {
  // DELETE BEFORE CREATING
  await prisma.decision.deleteMany({}); // use with caution.
  await prisma.user.deleteMany({}); // use with caution.
  await prisma.service.deleteMany({}); // use with caution.
  await prisma.status.deleteMany({}); // use with caution.

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

  // STATUS
  const status: StatusType[] = [
    { id: 1, name: "Prise de décision commencée" },
    { id: 2, name: "Deadline pour donner son avis" },
    { id: 3, name: "Première décision prise" },
    { id: 4, name: "Deadline pour entrer en conflit" },
    { id: 5, name: "Décision définitive" },
    { id: 6, name: "Décision archivée" },
    { id: 7, name: "Décision abandonnée" },
  ];

  try {
    await Promise.all(
      status.map(async (status) => {
        await prisma.status.create({
          data: status,
        });
      })
    );
  } catch (error) {
    console.error(error);
  }

  // DECISIONS
  const amountOfDecisions = 5;

  const createDecision = async (): Promise<DecisionType> => {
    // CREATE NEW DECISION
    const newDecision: DecisionType = {
      title: faker.lorem.words({ min: 3, max: 10 }),
      firstContent: faker.lorem.paragraphs({ min: 3, max: 10 }),
      secondContent: faker.lorem.paragraphs({ min: 3, max: 10 }),
      utility: faker.lorem.paragraphs({ min: 1, max: 3 }),
      context: faker.lorem.paragraphs({ min: 1, max: 3 }),
      pros: faker.lorem.paragraphs({ min: 1, max: 3 }),
      cons: faker.lorem.paragraphs({ min: 1, max: 3 }),
      statusId: await getRandomStatusId(),
      userId: await getRandomUserId(),
    };

    return newDecision;
  };

  const decisions: DecisionType[] = [];

  for (let i = 0; i < amountOfDecisions; i++) {
    decisions.push(await createDecision());
  }

  try {
    await Promise.all(
      decisions.map(async (decision) => {
        await prisma.decision.create({
          data: decision,
        });
      })
    );
  } catch (error) {
    console.error(error);
  }

  // COMMENTS
  const amountOfComments = 5;

  const createComment = async (): Promise<CommentType> => {
    // CREATE NEW COMMENT
    const newComment: CommentType = {
      title: faker.lorem.words({ min: 3, max: 10 }),
      content: faker.lorem.paragraph({ min: 1, max: 3 }),
      userId: await getRandomUserId(),
      decisionId: await getRandomDecisionId(),
    };

    return newComment;
  };

  const comments: CommentType[] = [];

  for (let i = 0; i < amountOfComments; i++) {
    comments.push(await createComment());
  }

  try {
    await Promise.all(
      comments.map(async (comment) => {
        await prisma.comment.create({
          data: comment,
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
