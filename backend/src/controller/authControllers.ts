import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authControllers = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (process.env.ACCESS_TOKEN_SECRET === undefined) {
      throw new Error("ACCESS_TOKEN_SECRET variable is not defined");
    }
    const payload: { email: string; password: string } = { email, password };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token, payload });
  },
  register: async (req: Request, res: Response) => {
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
      await prisma.user.create({
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
      res.status(201).send("Created user");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while creating user" });
    }
  },
};
