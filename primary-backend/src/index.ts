import "dotenv/config";
import express from "express";
import { v1Router } from "./routes/v1";

const app = express();
const PORT = 3000;

app.use("/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
