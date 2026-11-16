import express from "express";
import morgan from "morgan";
import { Express } from "express";
import { userRouterDb } from "./routes/user-routes.ts";
import { projectRouterDb } from "./routes/project-routes.ts";

const app: Express = express();
const port: number = 2001;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./public"));

app.use('/api/users', userRouterDb, projectRouterDb);

app.listen(port, () =>
{
    console.log(`My server is running at http://localhost:${port}/api/users`);
});