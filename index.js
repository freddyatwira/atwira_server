import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import authRoutes from "./routes/auth.js";
import { db } from "./models/dbConfig.js";

const app = express();

app.use(express.json());

const port = process.env.MY_PORT || 8008;

app.use(cors());

app.use("/auth", authRoutes);

db.then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((error) => console.log(`${error} did not connect`));
