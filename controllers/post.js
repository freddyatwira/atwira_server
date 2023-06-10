import { Post } from "../models/PostModel.js";
import { User } from "../models/UserModel.js";

export const createPost = async (req, res) => {
  try {
    const { user, title, description } = req.body;
    const post = await Post.create();
  } catch (error) {}
};
