import express from "express";
import { createBoothHandler } from "./booth/create";
import webhookHandler from "./webhook/clerk";

const v1Router = express.Router();

v1Router.use("/create-booth", createBoothHandler);
// v1Router.use("/edit-booth", editBoothHandler);
// v1Router.use("delete-booth", deleteBoothHandler);
// v1Router.use("/fetch-booth", fetchBoothHandler);
// v1Router.use("/fetch-all-booth", fetchAllBoothHandler);
v1Router.use("webhooks/clerk", webhookHandler);

export { v1Router };
