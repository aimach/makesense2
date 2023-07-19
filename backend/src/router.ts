import express from "express";
export const router = express.Router();

import { serviceControllers } from "./controller/serviceControllers";

router.get("/services", serviceControllers.getAllServices);
router.get("/services/:id", serviceControllers.getServiceById);
router.post("/services", serviceControllers.createService);
router.put("/services/:id", serviceControllers.updateService);
router.delete("/services/:id", serviceControllers.deleteService);
