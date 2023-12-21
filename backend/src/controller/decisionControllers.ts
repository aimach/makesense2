import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const decisionControllers = {
  // READ
  getAllDecisions: async (req: Request, res: Response): Promise<void> => {
    try {
      const filters: Prisma.DecisionWhereInput[] = [];
      const { status, text, sort, before, after } = req.query;
      const beforeDate = new Date(before as string);
      const afterDate = new Date(after as string);

      // ADD STATUS FILTER
      if (status)
        filters.push({
          statusId: {
            in: (status as string)
              .split(",")
              .map((item: string) => parseInt(item, 10)),
          },
        });

      // ADD TEXT FILTER
      if (text)
        filters.push({
          OR: [
            { title: { contains: text as string } },
            { firstContent: { contains: text as string } },
          ],
        });

      // ADD DATE FILTER
      if (before) {
        filters.push({
          createdAt: {
            lte: beforeDate,
          },
        });
      }
      if (after) {
        filters.push({
          createdAt: {
            gte: afterDate,
          },
        });
      }
      // ADD SORTING
      const sorting: Prisma.DecisionOrderByWithRelationInput =
        sort === "date"
          ? {
              createdAt: "desc",
            }
          : {
              statusId: "asc",
            };

      const allDecisions = await prisma.decision.findMany({
        where: { AND: filters },
        include: {
          status: true,
          comments: {
            include: {
              user: true,
            },
          },
          user: true,
          users: {
            select: {
              user: true,
              type: true,
            },
          },
          groups: {
            select: {
              group: true,
            },
          },
          categories: {
            select: {
              category: true,
            },
          },
        },
        orderBy: sorting,
      });
      res.status(200).send(allDecisions);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading decisions" });
    }
  },
  getDecisionById: async (req: Request, res: Response): Promise<void> => {
    try {
      const decisionToRead = await prisma.decision.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          status: true,
          comments: {
            include: {
              user: true,
            },
          },
          user: true,
          users: {
            select: {
              user: true,
              type: true,
            },
          },
          groups: {
            select: {
              group: true,
            },
          },
          categories: {
            select: {
              category: true,
            },
          },
        },
      });
      if (decisionToRead === null) {
        res.status(404).send({ error: "Decision not found" });
        return;
      }
      res.status(200).send(decisionToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading decision" });
    }
  },

  // CREATE
  createDecision: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        title,
        firstContent,
        secondContent,
        utility,
        context,
        pros,
        cons,
        statusId,
        userId,
      } = req.body;
      await prisma.decision.create({
        data: {
          title,
          firstContent,
          secondContent,
          utility,
          context,
          pros,
          cons,
          statusId,
          userId,
        },
      });
      res.status(201).send("Created decision");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while creating decision" });
    }
  },

  // UPDATE
  updateDecision: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        title,
        firstContent,
        secondContent,
        utility,
        context,
        pros,
        cons,
        statusId,
        userId,
      } = req.body;
      await prisma.decision.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          title,
          firstContent,
          secondContent,
          utility,
          context,
          pros,
          cons,
          statusId,
          userId,
        },
      });
      res.status(201).send("Updated decision");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while updating decision" });
    }
  },

  // UPDATE
  deleteDecision: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.decision.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(201).send("Deleted decision");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while deleting decision" });
    }
  },
};
