import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors"
import mongoose from 'mongoose'

import config from "./config/config";
import logging from "./config/logging";


// express server config
const NAMESPACE = "Server";
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongo connection
// const URI: string= process.env.ATLAS_URI || "";
// console.log(typeof URI);
// console.log(URI)
// mongoose.connect(URI, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true, // true will break tests
//   useFindAndModify: false,
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   logging.info(NAMESPACE, "MongoDB database connection established successfully")
// });

// serving build static files
app.use(express.static(path.resolve(__dirname, "../../react", "build")));

// api imports ==============================================================
import dogRouter from "./routes/dogs";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import dateRouter from "./routes/dogDate";
import dogRatingRouter from "./routes/dogRating";
import locationRouter from "./routes/locations";
import msgRouter from "./routes/messages";
import eventRouter from "./routes/event";

// lock api calls to only users with token
// token is grabbed from res.header("auth-token")
// do this after
// const verifyToken = require("./validate-token");

app.use("/api/auth", authRouter);
app.use("/api/dogs", /* verifyToken, */ dogRouter);
app.use("/api/users", /* verifyToken, */ userRouter);
app.use("/api/date", /* verifyToken, */ dateRouter);
app.use("/api/rate", /* verifyToken, */ dogRatingRouter);
app.use("/api/locations", /* verifyToken, */ locationRouter);
app.use("/api/msg", msgRouter);
app.use("/api/event", eventRouter);

// ==========================================================================

/* error handling */
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found');

  logging.error(NAMESPACE, "Something major went wrong");
  res.status(400).json({ message: error.message });
})

// redirecting everything else to the main build index.html
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../react", "build", "index.html"));
});

/* Starting server */
app.listen(PORT, () => {
  logging.info(NAMESPACE, `Server running on ${PORT}`);
});

