import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface refreshToken {
  email: string;
  password: string;
  iat: number;
  exp: number;
}

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

  logout: (req: Request, res: Response) => {
    // clear cookies
    res
      .clearCookie("refreshtoken")
      .send({ message: "Logged out successfully! 🤗", type: "success" });
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const { refreshtoken } = req.cookies;
      // if we don't have a refresh token, return error
      if (!refreshtoken) {
        res.status(500).json({
          message: "No refresh token!",
          type: "error",
        });
      }
      // if we have a refresh token, you have to verify it
      let refreshTokenVerified;
      try {
        refreshTokenVerified = jwt.verify(
          refreshtoken,
          process.env.REFRESH_TOKEN_SECRET as string
        ) as refreshToken;
      } catch (error) {
        res.status(500).json({
          message: "Invalid refresh token! 🤔",
          type: "error",
        });
      }
      // if the refresh token is invalid, return error
      if (!refreshTokenVerified)
        return res.status(500).json({
          message: "Invalid refresh token! 🤔",
          type: "error",
        });
      // if the refresh token is valid, check if the user exists
      let user;
      try {
        user = await prisma.user.findUnique({
          where: {
            email: refreshTokenVerified.email,
          },
        });
        console.log(user);
      } catch (error) {
        // if the user doesn't exist, return error
        res.status(500).json({
          message: "User doesn't exist! 😢",
          type: "error",
        });
      }
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "Error refreshing token!",
        error,
      });
    }
  },
};
