import { requireAuth } from "@clerk/express";
import express from "express";
import { prisma } from "../../../db";

const createBoothHandler = express.Router();

createBoothHandler.post("/", requireAuth(), async (req, res) => {});

export { createBoothHandler };
