import express from "express";
import morgan from "morgan";
import { User } from "./models/user_model";
import { Express, Request, Response } from "express";
import { UserDb } from "./models/user_model";

const app: Express = express();
const port: Number = 2001;

app.use(express.json());
app.use(morgan("dev"));

