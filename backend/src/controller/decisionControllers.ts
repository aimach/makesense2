import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const decisionControllers = {
  // READ
  getAllDecisions: async (req: Request, res: Response): Promise<void> => {
    try {
      const allDecisions = await prisma.decision.findMany({
        include: {
          status: true,
          comments: true,
          user: true,
          users: true,
          groups: true,
        },
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
          comments: true,
          user: true,
          users: true,
          groups: true,
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
