import express from "express";
import { createBoothHandler } from "./booth/create";
import { editBoothHandler } from "./booth/edit";
import { deleteBoothHandler } from "./booth/delete";
import { parseHandler } from "./booth/parse";
import { fetchAllBoothHandler } from "./booth/fetch-all";
import { fetchBoothHandler } from "./booth/fetch";

const v1Router = express.Router();

v1Router.use("/create-booth", createBoothHandler);
v1Router.use("/edit-booth", editBoothHandler);
v1Router.use("/delete-booth", deleteBoothHandler);
v1Router.use("/fetch-booth", fetchBoothHandler);
v1Router.use("/fetch-all-booths", fetchAllBoothHandler);
v1Router.use("/parse", parseHandler);

export { v1Router };
