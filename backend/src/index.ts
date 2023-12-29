import express from "express";
import cors from "cors";
import cookieParser = require("cookie-parser");
import "dotenv/config";

const app = express();
const port = process.env.BACKEND_PORT || 5000;

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173", // keep this one, after checking the value in `backend/.env`
    ],
  })
);
app.use(express.json());
// parse the request's body as a query string
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// import and mount the API routes

import { router } from "./router";

app.use(router);

app.listen(port, () => {
  console.log(`🚀 Makesense app listening on port ${port}`);
});
