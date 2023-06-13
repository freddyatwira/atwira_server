import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    desc: {
      type: String,
      required: [true, "description is required"],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
