import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import { notFoundHandler } from "./app/middlewares";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Application routes
app.use("/api", router);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Spark Chat APIs!");
});

// Not Found
app.use(notFoundHandler);

export default app;
