import express from "express";
import {
  createPost,
  showPost,
  showPosts,
  updatePost,
  deletePost,
  myPosts,
} from "../controllers/post.js";
import { protect } from "../middleware/routeProtect.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/show", showPosts);
router.get("/myposts/:author", myPosts);
router.get("/show/:id", showPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;
