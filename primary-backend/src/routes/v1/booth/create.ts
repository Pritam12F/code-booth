import { Router } from "express";
import express from "express";
import { CreateBoothSchema } from "../../../schema";
import { prisma } from "../../../db";
import { requireAuth } from "@clerk/express";

export const createBoothHandler: Router = express.Router();

createBoothHandler.post(
  "/",
  requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }),
  async (req, res) => {
    const { success, data } = CreateBoothSchema.safeParse(req.body);

    if (!success) {
      res
        .json({
          message: "Invalid inputs",
        })
        .status(411);

      return;
    }

    try {
      const booth = await prisma.booth.create({
        data: {
          intervieweeId: data?.intervieweeId,
          interviewerId: data.interviewerId,
          title: data.title,
        },
      });

      data.tasks?.map(async (task) => {
        await prisma.task.create({ data: { boothId: booth.id, name: task } });
      });

      res.json({
        message: "Successfully created booth",
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error occured trying to create booth";

      res
        .json({
          message,
        })
        .status(400);
    }
  }
);
