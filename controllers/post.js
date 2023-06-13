import { Post } from "../models/PostModel.js";
import { User } from "../models/UserModel.js";

/* CREATING A POST 
THE POST MUST HAVE THE USER
FIND THE AUTHER FROM THE REG BODY
THE AUTHOR SHOULD CONVERT THE USER._ID
*/

export const createPost = async (req, res) => {
  try {
    const { author, title, desc } = req.body;

    const user = await User.findById(author);

    const newPost = new Post({ author: user._id, title, desc });

    await newPost.save();

    const posts = await Post.find();

    return res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

/* END OF CREATING A POST */

/* SHOWING PERSONAL POST
THE AUTHOR SHOULD COME FROM PARAMS
*/

export const myPosts = async (req, res) => {
  try {
    const { author } = req.params;

    const posts = await Post.find({ author });

    return res.status(201).json(posts);
  } catch (error) {
    console.log(error);
  }
};

/* END OF SHOWING PERSONAL POST */

/* SHOWING ALL POST */

export const showPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/* END OF SHOWING ALL POST */

/* SHOWING A SINGLE POST */

export const showPost = async (req, res) => {
  try {
    const post = await Post.findOne();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/* END OF SHOWING A SINGLE POST */

/* START OF UPDATING A POST */

export const updatePost = async (req, res) => {
  try {
    const { _id, title, desc } = req.body;
    const article = await Post.updateOne(
      { _id },
      { $set: { title: title, desc: desc } }
    );
    res.status(200).json(article);
  } catch (err) {
    console.log({ error: err.message });
  }
};

/* END OF UPDATING A POST */

/* START OF DELETING A POST */

export const deletePost = async (req, res) => {
  try {
    const { _id } = req.params;

    console.log(req.params);

    const post = await Post.deleteOne({ _id });

    // console.log(post);

    // if (!post) return res.status(404).json({ message: "Post not found" });

    // await Post.deleteOne({ post });

    // const newPosts = await Post.find();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/* END OF DELETING A POST */
