import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import routes from "./routes/index.ts"; // terminal has trouble reading index.ts

export const app = express();

const MONGO_URI = Deno.env.get("MONGO_URI") as string;
const PORT = Deno.env.get("PORT");

// mongodb
mongoose.connect(MONGO_URI); // currently no connection options
mongoose.connection.once(
  "open",
  () => console.log("MongoDb connection established"),
);

// middlewares
app.use(cors());
app.use(express.json());

// logging
// auth

// error handling

// serving static site
// routing to be exported and implemented elsewhere
app.use("/api", routes);
// catch all redirection

app.listen(PORT, () => {
  console.log("server be running at port", PORT);
});
