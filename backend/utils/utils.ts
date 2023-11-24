import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const removeDuplicates = (array: string[]): string[] => {
  return [...new Set(array)];
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

export {
  removeDuplicates,
  getRandomUserId,
  getRandomServiceId,
  getRandomStatusId,
  getRandomDecisionId,
};
