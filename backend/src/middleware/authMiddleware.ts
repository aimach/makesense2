import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authMiddleware = {
  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const userToRead = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (userToRead !== null) {
        res.status(409).send({ error: "Email already exists" });
        return;
      }
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading user" });
    }
  },

  getUserByEmailAndPassword: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      const userToRead = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (userToRead === null) {
        res.status(404).send({ error: "User not found" });
        return;
      }
      req.body.user = userToRead;
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading user" });
    }
  },

  hashPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      req.body.password = hashPassword;
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while hashing password" });
    }
  },

  verifyPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;
      const isRightPassowrd = await bcrypt.compare(
        password,
        req.body.user.password
      );
      if (!isRightPassowrd) {
        res.status(401).send({ error: "Wrong credentials" });
        return;
      }
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error whith credentials" });
    }
  },
};
