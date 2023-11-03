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
    const payload = { email, password };
    // signing the access token
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 15 * 60,
    });
    // signing the refresh token
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "90d",
      }
    );

    res
      // sending the refresh token to the client as a cookie
      .cookie("refreshtoken", refreshToken, { httpOnly: true })
      // sending the access token to the client
      .send({ accessToken, payload })
      .status(200);
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
