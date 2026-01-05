import dotenv from "dotenv/config";
import express from "express";
import connectToDB from "./database/dbconfig.js";

const app = express();

const port = process.env.PORT;

await connectToDB(process.env.URL);

app.get("/", (req, res)=> {
    res.json({message: "Hello World!"})
})

app.listen(port, () => {
    console.log(`Server has started on PORT ${port}!`);
});

