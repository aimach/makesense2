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

// STATUS

router.get("/status", statusControllers.getAllStatus);
router.get("/status/:id", statusControllers.getStatusById);
router.post("/status", statusControllers.createStatus);
router.put("/status/:id", statusControllers.updateStatus);
router.delete("/status/:id", statusControllers.deleteStatus);

// COMMENTS

router.get("/comments", commentControllers.getAllComments);
router.get("/comments/:id", commentControllers.getCommentById);
router.get(
  "/comments/decisions/:decisionId",
  commentControllers.getCommentsByDecisionId
);
router.get("/comments/users/:userId", commentControllers.getCommentsByUserId);
router.post("/comments", commentControllers.createComment);
router.put("/comments/:id", commentControllers.updateComment);
router.delete("/comments/:id", commentControllers.deleteComment);

// USERS

router.get("/users", userControllers.getAllUsers);
router.get("/users/:id", userControllers.getUserById);
router.put(
  "/users/:id",
  authMiddleware.getUserByEmailAndPassword,
  userControllers.updateUser
);
router.delete("/users/:id", userControllers.deleteUser);

// DECISIONS

router.get("/decisions", decisionControllers.getAllDecisions);
router.get("/decisions/:id", decisionControllers.getDecisionById);
router.post("/decisions", decisionControllers.createDecision);
router.put("/decisions/:id", decisionControllers.updateDecision);
router.delete("/decisions/:id", decisionControllers.deleteDecision);

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

// PROTECTED ROUTES

router.get(
  "/protected",
  authMiddleware.protected,
  authControllers.checkIfUserIsInBodyReq
);
