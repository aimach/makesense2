import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const commentControllers = {
  // READ
  getAllComments: async (req: Request, res: Response): Promise<void> => {
    try {
      const allComments = await prisma.comment.findMany();
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
  getCommentsByDecisionId: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const commentsToRead = await prisma.comment.findMany({
        where: {
          decisionId: parseInt(req.params.decisionId),
        },
      });
      if (commentsToRead === null) {
        res.status(404).send({ error: "Comments not found" });
        return;
      }
      res.status(200).send(commentsToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading comment" });
    }
  },
  getCommentsByUserId: async (req: Request, res: Response): Promise<void> => {
    try {
      const commentsToRead = await prisma.comment.findMany({
        where: {
          userId: parseInt(req.params.userId),
        },
      });
      if (commentsToRead === null) {
        res.status(404).send({ error: "Comments not found" });
        return;
      }
      res.status(200).send(commentsToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading comment" });
    }
  },

  // CREATE
  createComment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content, decisionId, userId, date } = req.body;
      await prisma.comment.create({
        data: {
          title,
          content,
          decisionId,
          userId,
          date,
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
      const { title, content, decisionId, userId, date } = req.body;
      await prisma.comment.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: { title, content, decisionId, userId, date },
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
