import express from "express";
import cookieParser = require("cookie-parser");

const app = express();
const port = process.env.BACKEND_URL || 5000;

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
