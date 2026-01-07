import dotenv from "dotenv/config";
import express from "express";
import connectToDB from "./database/dbconfig.js";
import todoRoute from "./routes/todoRoute.js";

const app = express();

app.use(express.json());

const port = process.env.PORT;

await connectToDB(process.env.URL);

app.use("/todos", todoRoute);

app.listen(port, () => {
  console.log(`Server has started on PORT ${port}!`);
});
