import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IrefreshToken } from "../controller/authControllers";

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
          email: email,
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

  protected: async (req: Request, res: Response, next: NextFunction) => {
    // get the token from the header
    const authorization = req.headers["authorization"];
    // if we don't have a token, return error
    if (!authorization) {
      res.status(500).json({
        message: "No token! 🤔",
        type: "error",
      });
    } else {
      // if we have a token, you have to verify it
      const token = authorization.split(" ")[1];
      let tokenVerified;
      try {
        tokenVerified = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET as string
        ) as IrefreshToken;
      } catch {
        return res.status(500).json({
          message: "Invalid token! 🤔",
          type: "error",
        });
      }
      // if the token is invalid, return error
      if (!tokenVerified) {
        res.status(500).json({
          message: "Invalid token! 🤔",
          type: "error",
        });
      } else {
        // if the token is valid, check if the user exists
        const userToRead = await prisma.user.findUnique({
          where: {
            email: tokenVerified.email,
          },
        });
        // if the user doesn't exist, return error
        if (!userToRead) {
          res.status(500).json({
            message: "User doesn't exist! 😢",
            type: "error",
          });
        } else {
          req.body.user = userToRead;
          next();
        }
      }
    }
  },
};
