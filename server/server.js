import dotenv from "dotenv/config";
import express from "express";
import connectToDB from "./database/dbconfig.js";
import todoRoute from "./routes/todoRoute.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

await connectToDB(process.env.URL);

app.use("/todos", todoRoute);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on PORT ${process.env.PORT}!`);
});
