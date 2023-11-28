import { PrismaClient } from "@prisma/client";
import { GroupType, CategoryType, UserType } from "./types";

const prisma = new PrismaClient();

type arrayWithDuplicates = string[] | GroupType[] | CategoryType[];

const removeDuplicates = (array: arrayWithDuplicates) => {
  if (typeof array[0] === "string") {
    return [...new Set(array as Iterable<string>)];
  } else if (typeof array[0] === "object") {
    const uniqueItems: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (array as any[]).filter((item: string | GroupType | CategoryType) => {
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

const getRandomNb = (max: number): number => {
  return Math.round(Math.random() * (max - 1) + 1);
};

const getRandomCategory = async (): Promise<CategoryType> => {
  const allCategories = await prisma.category.findMany();
  return allCategories[Math.floor(Math.random() * allCategories.length)];
};
const getRandomUser = async (): Promise<UserType> => {
  const allUsers = await prisma.user.findMany();
  return allUsers[Math.floor(Math.random() * allUsers.length)];
};

export { removeDuplicates, getRandomNb, getRandomCategory, getRandomUser };
