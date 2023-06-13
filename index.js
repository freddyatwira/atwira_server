import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import { db } from "./models/dbConfig.js";
import { protect } from "./middleware/routeProtect.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const port = process.env.MY_PORT || 5005;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", postRoutes);

app.use("/auth", authRoutes);

db.then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((error) => console.log(`${error} did not connect`));
