import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface IrefreshToken {
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
      expiresIn: 60 * 60,
    });
    // signing the refresh token
    const refreshTokenCookie = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "90d",
      }
    );
    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          refreshToken: refreshTokenCookie,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Cannot register token in db!",
        type: "error",
        error,
      });
    }

    res
      // sending the refresh token to the client as a cookie
      .cookie("refreshtoken", refreshTokenCookie, { httpOnly: true });
    // sending the access token to the client
    return res.status(200).send({ accessToken });
  },
  register: async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, email, password, position, serviceId } =
        req.body;
      await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password,
          position,
          serviceId: parseInt(serviceId),
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
      const refreshTokenCookie = req.cookies.refreshtoken;
      // if we don't have a refresh token, return error
      if (!refreshTokenCookie) {
        res.status(500).json({
          message: "No refresh token!",
          type: "error",
        });
      }
      // if we have a refresh token, you have to verify it
      let refreshTokenVerified;
      try {
        refreshTokenVerified = jwt.verify(
          refreshTokenCookie,
          process.env.REFRESH_TOKEN_SECRET as string
        ) as IrefreshToken;
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
      } catch (error) {
        // if the user doesn't exist, return error
        res.status(500).json({
          message: "User doesn't exist! 😢",
          type: "error",
        });
      }
      // if the user exists, check if the refresh token is correct. return error if it is incorrect.
      if (user?.refreshToken !== refreshTokenCookie) {
        return res.status(500).json({
          message: "Invalid refresh token! 🤔",
          type: "error",
        });
      }
      // if the refresh token is correct, create the new tokens
      const payload = { email: user?.email, password: user?.password };
      // signing the access token
      const newAccessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: 15 * 60,
        }
      );
      // signing the refresh token
      const newRefreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET as string,
        {
          expiresIn: "90d",
        }
      );
      // update the refresh token in the database
      try {
        await prisma.user.update({
          where: {
            email: user?.email,
          },
          data: {
            refreshToken: newRefreshToken,
          },
        });
      } catch (error) {
        res.status(500).json({
          message: "Cannot register token in db!",
          type: "error",
          error,
        });
      }
      // send the new tokens as response
      res
        .cookie("refreshtoken", newRefreshToken, {
          httpOnly: true,
        })
        .json({
          message: "Refreshed successfully! 🤗",
          type: "success",
          newAccessToken,
        });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "Error refreshing token!",
        error,
      });
    }
  },

  checkIfUserIsInBodyReq: async (req: Request, res: Response) => {
    try {
      // if user exists in the request, send the data
      if (req.body.user) {
        res.json({
          message: "You are logged in! 🤗",
          type: "success",
          user: req.body.user,
        });
      } else {
        // if user doesn't exist, return error
        res.status(500).json({
          message: "You are not logged in! 😢",
          type: "error",
        });
      }
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "Error getting protected route!",
        error,
      });
    }
  },

  getMyProfile: async (req: Request, res: Response) => {
    try {
      const userToRead = await prisma.user.findUnique({
        where: {
          id: parseInt(req.body.user.id),
        },
        select: {
          id: true,
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
        res.status(404).send("User not found");
        return;
      }
      res.status(200).send(userToRead);
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "Error getting protected route!",
        error,
      });
    }
  },
};
