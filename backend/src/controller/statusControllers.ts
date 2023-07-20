import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const statusControllers = {
  // READ
  getAllStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      const allStatus = await prisma.status.findMany();
      res.status(200).send(allStatus);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading status" });
    }
  },
  getStatusById: async (req: Request, res: Response): Promise<void> => {
    try {
      const statusToRead = await prisma.status.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (statusToRead === null) {
        res.status(404).send({ error: "Status not found" });
        return;
      }
      res.status(200).send(statusToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading status" });
    }
  },

  // CREATE
  createStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.status.create({
        data: {
          name: req.body.name,
        },
      });
      res.status(201).send("Created status");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while creating status" });
    }
  },

  // UPDATE
  updateStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      await prisma.status.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name,
        },
      });
      res.status(201).send("Updated status");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while updating status" });
    }
  },

  // UPDATE
  deleteStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.status.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(201).send("Deleted status");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while deleting status" });
    }
  },
};
