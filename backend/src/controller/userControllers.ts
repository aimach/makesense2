import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const userControllers = {
  // READ
  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const allUsers = await prisma.user.findMany({
        select: {
          firstname: true,
          lastname: true,
          email: true,
          avatar: true,
          admin: true,
          position: true,
          serviceId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.status(200).send(allUsers);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading users" });
    }
  },
  getUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const userToRead = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        select: {
          firstname: true,
          lastname: true,
          email: true,
          avatar: true,
          admin: true,
          position: true,
          serviceId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (userToRead === null) {
        res.status(404).send({ error: "User not found" });
        return;
      }
      res.status(200).send(userToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading user" });
    }
  },

  // UPDATE
  updateUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        avatar,
        admin,
        position,
        serviceId,
      } = req.body;
      await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          firstname,
          lastname,
          email,
          password,
          avatar,
          admin,
          position,
          serviceId,
        },
      });
      res.status(201).send("Updated user");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while updating user" });
    }
  },

  // UPDATE
  deleteUser: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(201).send("Deleted user");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while deleting user" });
    }
  },
};
