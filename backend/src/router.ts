import express from "express";
export const router = express.Router();

import { serviceControllers } from "./controller/serviceControllers";
import { groupControllers } from "./controller/groupControllers";
import { categoryControllers } from "./controller/categoryControllers";
import { statusControllers } from "./controller/statusControllers";
import { commentControllers } from "./controller/commentControllers";
import { userControllers } from "./controller/userControllers";
import { decisionControllers } from "./controller/decisionControllers";
import { authControllers } from "./controller/authControllers";
import { authMiddleware } from "./middleware/authMiddleware";

// TEST
router.get("/", (req, res) => {
  res.status(200).send("Helloooooo");
});

// SERVICES

router.get("/services", serviceControllers.getAllServices);
router.get("/services/:id", serviceControllers.getServiceById);
router.post(
  "/services",
  authMiddleware.protected,
  serviceControllers.createService
);
router.put(
  "/services/:id",
  authMiddleware.protected,
  serviceControllers.updateService
);
router.delete(
  "/services/:id",
  authMiddleware.protected,
  serviceControllers.deleteService
);

// GROUPS

router.get("/groups", groupControllers.getAllGroups);
router.get("/groups/:id", groupControllers.getGroupById);
router.post("/groups", authMiddleware.protected, groupControllers.createGroup);
router.put(
  "/groups/:id",
  authMiddleware.protected,
  groupControllers.updateGroup
);
router.delete(
  "/groups/:id",
  authMiddleware.protected,
  groupControllers.deleteGroup
);

// CATEGORIES

router.get("/categories", categoryControllers.getAllCategories);
router.get("/categories/:id", categoryControllers.getCategoryById);
router.post(
  "/categories",
  authMiddleware.protected,
  categoryControllers.createCategory
);
router.put(
  "/categories/:id",
  authMiddleware.protected,
  categoryControllers.updateCategory
);
router.delete(
  "/categories/:id",
  authMiddleware.protected,
  categoryControllers.deleteCategory
);

// STATUS

router.get("/status", statusControllers.getAllStatus);
router.get("/status/:id", statusControllers.getStatusById);
router.post(
  "/status",
  authMiddleware.protected,
  statusControllers.createStatus
);
router.put(
  "/status/:id",
  authMiddleware.protected,
  statusControllers.updateStatus
);
router.delete(
  "/status/:id",
  authMiddleware.protected,
  statusControllers.deleteStatus
);

// COMMENTS

router.get("/comments", commentControllers.getAllComments);
router.get("/comments/:id", commentControllers.getCommentById);

router.post(
  "/comments",
  authMiddleware.protected,
  commentControllers.createComment
);
router.put(
  "/comments/:id",
  authMiddleware.protected,
  commentControllers.updateComment
);
router.delete(
  "/comments/:id",
  authMiddleware.protected,
  commentControllers.deleteComment
);

// USERS

router.get("/users", authMiddleware.protected, userControllers.getAllUsers);
router.get("/users/:id", authMiddleware.protected, userControllers.getUserById);
router.put(
  "/users/:id",
  authMiddleware.getUserByEmailAndPassword,
  userControllers.updateUser
);
router.delete(
  "/users/:id",
  authMiddleware.protected,
  userControllers.deleteUser
);

// DECISIONS

router.get("/decisions", decisionControllers.getAllDecisions);
router.get("/decisions/:id", decisionControllers.getDecisionById);
router.post(
  "/decisions",
  authMiddleware.protected,
  decisionControllers.createDecision
);
router.put(
  "/decisions/:id",
  authMiddleware.protected,
  decisionControllers.updateDecision
);
router.delete(
  "/decisions/:id",
  authMiddleware.protected,
  decisionControllers.deleteDecision
);

// CONNEXION
router.post(
  "/login",
  authMiddleware.getUserByEmailAndPassword,
  authMiddleware.verifyPassword,
  authControllers.login
);

router.post(
  "/register",
  authMiddleware.verifyEmail,
  authMiddleware.hashPassword,
  authControllers.register
);

router.post("/logout", authControllers.logout);
router.post("/refresh-token", authControllers.refreshToken);

router.get(
  "/my-profile",
  authMiddleware.protected,
  authControllers.getMyProfile
);
