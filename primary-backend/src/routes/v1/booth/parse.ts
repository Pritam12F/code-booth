import { requireAuth } from "@clerk/express";
import express from "express";
import { CodeSchema } from "../../../schema";
import { codeQueue } from "../../../queue";

export const parseHandler = express.Router();

parseHandler.post(
  "/",
  requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }),
  async (req, res) => {
    const userId = req.auth.userId;

    if (!userId) {
      res
        .json({
          message: "User ID not provided",
        })
        .status(401);

      return;
    }

    const { success, data } = CodeSchema.safeParse(req.body);

    if (!success) {
      res
        .json({
          message: "Invalid inputs",
        })
        .status(411);

      return;
    }
    try {
      await codeQueue.add({
        ...data,
      });

      res.json({
        message: "Code has been pushed to queue",
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error occured trying to fetch booths";

      res
        .json({
          message,
        })
        .status(400);
    }
  }
);
