import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import errorController from "./controllers/errorController.js";
import CustomError from "./utils/error/CustomError.js";
import splitRoute from "./routes/splitRoute.js";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
  })
);

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

app.use("/split-payment/", splitRoute);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use(errorController);

export default app;
