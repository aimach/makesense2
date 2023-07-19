import express from "express";
const app = express();
const port = 5000;

app.use(express.json());

// import and mount the API routes

import { router } from "./router";

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
