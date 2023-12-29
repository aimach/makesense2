import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const commentControllers = {
  // READ
  getAllComments: async (req: Request, res: Response): Promise<void> => {
    try {
      const allComments = await prisma.comment.findMany({
        include: {
          user: true,
          decision: true,
        },
      });
      res.status(200).send(allComments);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading comments" });
    }
  },
  getCommentById: async (req: Request, res: Response): Promise<void> => {
    try {
      const commentToRead = await prisma.comment.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (commentToRead === null) {
        res.status(404).send({ error: "Comment not found" });
        return;
      }
      res.status(200).send(commentToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading comment" });
    }
  },

  // CREATE
  createComment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, decisionId, userId } = req.body;
      await prisma.comment.create({
        data: {
          content,
          decisionId: parseInt(decisionId, 10),
          userId: parseInt(userId, 10),
        },
      });
      res.status(201).send("Created comment");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while creating comment" });
    }
  },

  // UPDATE
  updateComment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, decisionId, userId, date } = req.body;
      await prisma.comment.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: { content, decisionId, userId, date },
      });
      res.status(201).send("Updated comment");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while updating comment" });
    }
  },

  // UPDATE
  deleteComment: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.comment.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(201).send("Deleted comment");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while deleting comment" });
    }
  },
};
