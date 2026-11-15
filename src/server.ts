import express from "express";
import morgan from "morgan";
import { User } from "./models/user_model.ts";
import { Express, Request, Response } from "express";
import { UserDb } from "./models/user_model.ts";
import { userRouterDb } from "./routes/user-routes.ts";

const app: Express = express();
const port: Number = 2001;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./public"));

app.use('/api/users', userRouterDb);

app.listen(port, () =>
{
    console.log(`My server is running at http://localhost:${port}/api/users`);
});