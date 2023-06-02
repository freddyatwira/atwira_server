import mongoose from "mongoose";
import { DB_URL } from "../config.js";

export const db = mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
