import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const groupControllers = {
  // READ
  getAllGroups: async (req: Request, res: Response): Promise<void> => {
    try {
      const allGroups = await prisma.group.findMany();
      res.status(200).send(allGroups);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading groups" });
    }
  },
  getGroupById: async (req: Request, res: Response): Promise<void> => {
    try {
      const groupToRead = await prisma.group.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (groupToRead === null) {
        res.status(404).send({ error: "Group not found" });
        return;
      }
      res.status(200).send(groupToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading groups" });
    }
  },

  // CREATE
  createGroup: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.group.create({
        data: {
          name: req.body.name,
        },
      });
      res.status(201).send("Created group");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while creating group" });
    }
  },

  // UPDATE
  updateGroup: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      await prisma.group.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name,
        },
      });
      res.status(201).send("Updated group");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while updating group" });
    }
  },

  // UPDATE
  deleteGroup: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.group.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(201).send("Deleted group");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while deleting group" });
    }
  },
};
