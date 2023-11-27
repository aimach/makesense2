import { PrismaClient } from "@prisma/client";
import { GroupType, CategoryType } from "./types";

const prisma = new PrismaClient();

type arrayWithDuplicates = string[] | GroupType[] | CategoryType[];

const removeDuplicates = (array: arrayWithDuplicates) => {
  if (typeof array[0] === "string") {
    return [...new Set(array as Iterable<string>)];
  } else if (typeof array[0] === "object") {
    const uniqueItems: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (array as any[]).filter(
      (item: string | GroupType | CategoryType) => {
        if (typeof item !== "string") {
          const isDuplicate = uniqueItems.includes(item.name);
          if (!isDuplicate) {
            uniqueItems.push(item.name);
          }
        }
      }
    );
  }
};

const getRandomUserId = async (): Promise<number> => {
  const allUsers = await prisma.user.findMany();
  return allUsers[Math.floor(Math.random() * allUsers.length)].id;
};

const getRandomServiceId = async () => {
  const allServices = await prisma.service.findMany();
  return allServices[Math.floor(Math.random() * allServices.length)].id;
};

const getRandomStatusId = async (): Promise<number> => {
  const allStatus = await prisma.status.findMany();
  return allStatus[Math.floor(Math.random() * allStatus.length)].id;
};

const getRandomDecisionId = async (): Promise<number> => {
  const allDecisions = await prisma.decision.findMany();
  return allDecisions[Math.floor(Math.random() * allDecisions.length)].id;
};

const getRandomCategoryId = async (): Promise<number> => {
  const allCategories = await prisma.category.findMany();
  return allCategories[Math.floor(Math.random() * allCategories.length)].id;
};

const getRandomCategory = async (): Promise<CategoryType> => {
  const allCategories = await prisma.category.findMany();
  return allCategories[Math.floor(Math.random() * allCategories.length)];
};

const getRandomNumberInRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export {
  removeDuplicates,
  getRandomUserId,
  getRandomServiceId,
  getRandomStatusId,
  getRandomDecisionId,
  getRandomCategoryId,
  getRandomNumberInRange,
  getRandomCategory,
};
