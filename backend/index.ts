const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const port = 5000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req: any, res: any) => {
  const services = await prisma.service.findMany();
  res.json(services);
});

app.post("/service", async (req: any, res: any) => {
  const { name } = req.body;
  const service = await prisma.service.create({
    data: {
      name,
    },
  });
  res.json(service);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
