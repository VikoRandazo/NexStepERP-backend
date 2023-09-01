import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import appRoutes from "./routes/appRoutes";
import { connectDB } from "../database/db";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", appRoutes);

app.listen(5000);
