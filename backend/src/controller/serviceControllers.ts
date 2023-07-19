import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const serviceControllers = {
  // READ
  getAllServices: async (req: Request, res: Response): Promise<void> => {
    try {
      const allServices = await prisma.service.findMany();
      res.status(200).send(allServices);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading services" });
    }
  },
  getServiceById: async (req: Request, res: Response): Promise<void> => {
    try {
      const serviceToRead = await prisma.service.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (serviceToRead === null) {
        res.status(404).send({ error: "Service not found" });
        return;
      }
      res.status(200).send(serviceToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading services" });
    }
  },

  // CREATE
  createService: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.service.create({
        data: {
          name: req.body.name,
        },
      });
      res.status(201).send("Created service");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while creating service" });
    }
  },

  // UPDATE
  updateService: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      await prisma.service.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name,
        },
      });
      res.status(201).send("Updated service");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while updating service" });
    }
  },

  // UPDATE
  deleteService: async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.service.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(201).send("Deleted service");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while deleting service" });
    }
  },
};
