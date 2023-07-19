import express from "express";
export const router = express.Router();

import { serviceControllers } from "./controller/serviceControllers";
import { groupControllers } from "./controller/groupControllers";
import { categoryControllers } from "./controller/categoryControllers";
// SERVICES

router.get("/services", serviceControllers.getAllServices);
router.get("/services/:id", serviceControllers.getServiceById);
router.post("/services", serviceControllers.createService);
router.put("/services/:id", serviceControllers.updateService);
router.delete("/services/:id", serviceControllers.deleteService);

// GROUPS

router.get("/groups", groupControllers.getAllGroups);
router.get("/groups/:id", groupControllers.getGroupById);
router.post("/groups", groupControllers.createGroup);
router.put("/groups/:id", groupControllers.updateGroup);
router.delete("/groups/:id", groupControllers.deleteGroup);

// CATEGORIES

router.get("/categories", categoryControllers.getAllCategories);
router.get("/categories/:id", categoryControllers.getCategoryById);
router.post("/categories", categoryControllers.createCategory);
router.put("/categories/:id", categoryControllers.updateCategory);
router.delete("/categories/:id", categoryControllers.deleteCategory);
