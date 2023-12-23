import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import CONF from "./src/core/config";

const app = express();

app.use(express.json());
const { PORT, DB_URL } = CONF;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Successful database connection");
  })
  .catch((err) => console.log("Database connection error: " + err));

  app.use(cors());

  
app.listen(PORT, () => {
  console.log("Server is up and running on " + PORT);
});