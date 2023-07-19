import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";
const app = express();
const port = 5000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = await prisma.user.findMany();
  res.json(users);
});

// app.get("/", async (req: Request, res: Response) => {
//   const services = await prisma.service.findMany();
//   res.json(services);
// });

// app.post("/service", async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const service = await prisma.service.create({
//     data: {
//       name,
//     },
//   });
//   if (service) {
//     res.json(service);
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
