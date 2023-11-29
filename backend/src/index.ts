import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173", // keep this one, after checking the value in `backend/.env`
    ],
  })
);
app.use(express.json());

// import and mount the API routes

import { router } from "./router";

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
