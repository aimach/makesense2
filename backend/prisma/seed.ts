import { PrismaClient } from "@prisma/client";
import { fakerFR as faker } from "@faker-js/faker";
import {
  CategoryType,
  CommentType,
  DecisionType,
  GroupType,
  StatusType,
  UserType,
} from "../utils/types";

const prisma = new PrismaClient();

async function main() {
  // SERVICES
  const amountOfServices = 5;

  const services: string[] = faker.helpers.multiple(faker.company.buzzNoun, {
    count: amountOfServices,
  });

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
  const amountOfUsers = 10;

  const createUsers = async (): Promise<UserType> => {
    // INITIALIZE REUSED DATAS
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();

    // CREATE RANDOM PASSWORD
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz#?!@$%^&*-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 8;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }

    // CREATE NEW USER
    const newUser: UserType = {
      firstname: firstname,
      lastname: lastname,
      email: `${firstname.toLowerCase().normalize()}.${lastname
        .toLowerCase()
        .normalize()}@makesense.com`,
      password: password,
      avatar: faker.internet.avatar(),
      admin: faker.datatype.boolean({ probability: 0.2 }),
      position: faker.company.buzzNoun(),
      serviceId: faker.helpers.rangeToNumber({ min: 1, max: amountOfServices }),
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
    { id: 1, name: "Prise de décision commencée" }, // date de création de la décision
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

  // CATEGORIES
  const amountOfCategories = 10;

  const createCategory = async (): Promise<CategoryType> => {
    // CREATE NEW CATEGORY
    const newCategory: CategoryType = {
      name: faker.lorem.words({ min: 1, max: 2 }),
      color: faker.color.rgb({ format: "hex" }),
    };

    return newCategory;
  };

  const categories: CategoryType[] = [];

  for (let i = 0; i < amountOfCategories; i++) {
    const newCategory = await createCategory();
    if (
      !categories.filter((category) => category.name === newCategory.name)
        .length
    ) {
      categories.push(newCategory);
    }
  }

  try {
    await Promise.all(
      categories.map(async (category) => {
        await prisma.category.create({
          data: category,
        });
      })
    );
  } catch (error) {
    console.error(error);
  }

  // GROUPS
  const amountOfGroups = 5;

  const createGroup = async (): Promise<GroupType> => {
    // CREATE USERS ARRAY
    const randomNbOfUsers = faker.helpers.rangeToNumber({ min: 1, max: 10 });
    const usersArray = [];

    for (let i = 0; i <= randomNbOfUsers; i++) {
      const newId = faker.helpers.rangeToNumber({ min: 1, max: amountOfUsers });
      if (
        !usersArray.filter((object) => object.user.connect.id === newId).length
      )
        usersArray.push({
          user: {
            connect: {
              id: newId,
            },
          },
        });
    }

    // CREATE NEW GROUP
    const newGroup: GroupType = {
      name: faker.commerce.department(),
      users: {
        create: usersArray,
      },
    };

    return newGroup;
  };

  const groups: GroupType[] = [];

  for (let i = 0; i < amountOfGroups; i++) {
    const newGroup = await createGroup();
    if (!groups.filter((group) => group.name === newGroup.name).length) {
      groups.push(newGroup);
    }
  }

  try {
    await Promise.all(
      groups.map(async (group) => {
        await prisma.group.create({
          data: group,
        });
      })
    );
  } catch (error) {
    console.error(error);
  }

  // DECISIONS
  const amountOfDecisions = 13;

  const createDecision = async (): Promise<DecisionType> => {
    // CREATE CATEGORIES ARRAY
    const randomNbOfCategories = faker.helpers.rangeToNumber({
      min: 1,
      max: 3,
    });
    const categoriesArray = [];

    for (let i = 0; i < randomNbOfCategories; i++) {
      const newId = faker.helpers.rangeToNumber({
        min: 1,
        max: amountOfCategories,
      });
      if (
        !categoriesArray.filter(
          (object) => object.category.connect.id === newId
        ).length
      )
        categoriesArray.push({
          category: {
            connect: {
              id: newId,
            },
          },
        });
    }

    // CREATE USERS ARRAY
    const randomNbOfUsers = faker.helpers.rangeToNumber({ min: 1, max: 5 });
    const usersArray = [];

    for (let i = 0; i <= randomNbOfUsers; i++) {
      const newId = faker.helpers.rangeToNumber({ min: 1, max: amountOfUsers });
      if (
        !usersArray.filter((object) => object.user.connect.id === newId).length
      )
        usersArray.push({
          type: faker.helpers.arrayElement(["expert", "concerné"]),
          user: {
            connect: {
              id: newId,
            },
          },
        });
    }

    // CREATE GROUPS ARRAY
    const randomNbOfGroups = faker.helpers.rangeToNumber({ min: 1, max: 2 });
    const groupsArray = [];

    for (let i = 0; i <= randomNbOfGroups; i++) {
      const newId = faker.helpers.rangeToNumber({
        min: 1,
        max: amountOfGroups,
      });
      if (
        !groupsArray.filter((object) => object.group.connect.id === newId)
          .length
      )
        groupsArray.push({
          type: faker.helpers.arrayElement(["experts", "concernés"]),
          group: {
            connect: {
              id: newId,
            },
          },
        });
    }

    // GENERATE DEADLINES
    const firstDeadline = faker.date.soon({
      days: faker.helpers.rangeToNumber({ min: 1, max: 30 }),
    });
    const firstDecision = faker.datatype.boolean({ probability: 0.5 })
      ? faker.date.soon({
          days: faker.helpers.rangeToNumber({
            min: 1,
            max: 30,
          }),
          refDate: firstDeadline,
        })
      : undefined;
    const secondDeadline =
      firstDecision != undefined
        ? faker.date.soon({
            days: faker.helpers.rangeToNumber({
              min: 1,
              max: 30,
            }),
            refDate: firstDecision,
          })
        : undefined;
    const finalDecision = faker.date.soon({
      days: faker.helpers.rangeToNumber({
        min: 1,
        max: 30,
      }),
      refDate: secondDeadline ? secondDeadline : firstDeadline,
    });

    // CREATE NEW DECISION
    const newDecision: DecisionType = {
      title: faker.lorem.words({ min: 3, max: 10 }),
      firstContent: faker.lorem.paragraphs({ min: 3, max: 10 }),
      secondContent: faker.lorem.paragraphs({ min: 3, max: 10 }),
      utility: faker.lorem.paragraphs({ min: 1, max: 3 }),
      context: faker.lorem.paragraphs({ min: 1, max: 3 }),
      pros: faker.lorem.paragraphs({ min: 1, max: 3 }),
      cons: faker.lorem.paragraphs({ min: 1, max: 3 }),
      firstDeadline: firstDeadline,
      firstDecision: firstDecision,
      secondDeadline: secondDeadline,
      finalDecision: finalDecision,
      statusId: faker.helpers.rangeToNumber({ min: 1, max: status.length }),
      userId: faker.helpers.rangeToNumber({ min: 1, max: amountOfUsers }),
      categories: {
        create: categoriesArray,
      },
      users: {
        create: usersArray,
      },
      groups: {
        create: groupsArray,
      },
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
  const amountOfComments = 20;

  const createComment = async (): Promise<CommentType> => {
    // CREATE NEW COMMENT
    const newComment: CommentType = {
      title: faker.lorem.words({ min: 3, max: 10 }),
      content: faker.lorem.paragraph({ min: 1, max: 3 }),
      userId: faker.helpers.rangeToNumber({ min: 1, max: amountOfUsers }),
      decisionId: faker.helpers.rangeToNumber({
        min: 1,
        max: amountOfDecisions,
      }),
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
