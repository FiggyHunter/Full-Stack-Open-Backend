import express from "express";
const router = express.Router();
import blogController from "../controllers/blog.controller.js";

// Define routes for the User resource
// router.post("/users", userController.createUser);
// router.get("/users", userController.getAllUsers);
// router.get("/users/:id", userController.getUserById);
// router.put("/users/:id", userController.updateUserById);
// router.delete("/users/:id", userController.deleteUserById);

router.get("/blogs", blogController.getAllBlogPosts);

router.post("/blogs", blogController.addBlogPost);

export default router;
