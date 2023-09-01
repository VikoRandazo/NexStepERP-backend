import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import appRoutes from "./routes/appRoutes";
import dotenv from "dotenv";
import { connectDB } from "../database/db";

connectDB();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", appRoutes);

app.listen(process.env.PORT);
