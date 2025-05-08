import express from "express";
import { createBoothHandler } from "./booth/create";
import webhookHandler from "./webhook/clerk";
import { editBoothHandler } from "./booth/edit";
import { deleteBoothHandler } from "./booth/delete";
import { fetchBoothHandler } from "./booth/fetch-all";
import { fetchAllBoothHandler } from "./booth/fetch";
import { parseHandler } from "./booth/parse";

const v1Router = express.Router();

v1Router.use("/create-booth", createBoothHandler);
v1Router.use("/edit-booth", editBoothHandler);
v1Router.use("/delete-booth", deleteBoothHandler);
v1Router.use("/fetch-booth", fetchBoothHandler);
v1Router.use("/fetch-all-booths", fetchAllBoothHandler);
v1Router.use("/parse", parseHandler);
v1Router.use("/webhooks/clerk", webhookHandler);

export { v1Router };
