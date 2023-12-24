import cors from "cors";
import express from "express";
import appRoutes from "./routes/appRoutes";
import dotenv from "dotenv";
import { connectDB } from "../database/db";
import { chatSocket } from "./controllers/chat";
import bodyParser from "body-parser";

const envConfig = dotenv.config();

if (envConfig.error) {
  console.log(envConfig.error);
}

connectDB();

const app = express();

app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json({ limit: `5mb` }));
app.use(express.urlencoded({ extended: true }));
app.use("/", appRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});

// chatSocket(server);
