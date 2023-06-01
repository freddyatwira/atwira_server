import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());

const port = process.env.MY_PORT || 8008;

app.use(cors());

app.listen(port, () => console.log(`Server running on port ${port}`));
