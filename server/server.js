import dotenv from "dotenv/config";
import express from "express";
import connectToDB from "./database/dbconfig.js";
import todoRoute from "./routes/todoRoute.js";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

await connectToDB(process.env.URL);

app.use("/todos", todoRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on PORT ${process.env.PORT}!`);
});
