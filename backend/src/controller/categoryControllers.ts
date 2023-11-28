import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const categoryControllers = {
  // READ
  getAllCategories: async (req: Request, res: Response): Promise<void> => {
    try {
      const allCategories = await prisma.category.findMany({
        include: {
          decisions: {
            select: {
              decision: true,
            },
          },
        },
      });
      res.status(200).send(allCategories);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading categories" });
    }
  },
  getCategoryById: async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryToRead = await prisma.category.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          decisions: {
            select: {
              decision: true,
            },
          },
        },
      });
      if (categoryToRead === null) {
        res.status(404).send({ error: "Category not found" });
        return;
      }
      res.status(200).send(categoryToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading category" });
    }
  },

  // CREATE
  createCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, color } = req.body;
      await prisma.category.create({
        data: {
          name,
          color,
        },
      });
      res.status(201).send("Created category");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while creating category" });
    }
  },

  // UPDATE
  updateCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, color } = req.body;
      await prisma.category.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name,
          color,
        },
      });
      res.status(201).send("Updated category");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while updating category" });
    }
  },

  // UPDATE
  deleteCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.category.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(201).send("Deleted category");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while deleting category" });
    }
  },
};
