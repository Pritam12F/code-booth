import { Router } from "express";
import express from "express";
import { prisma } from "../../../db";
import { requireAuth } from "@clerk/express";

export const fetchAllBoothHandler: Router = express.Router();

fetchAllBoothHandler.get(
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

    try {
      const booths = await prisma.booth.findMany({
        where: {
          OR: [
            {
              interviewerId: userId,
            },
            {
              intervieweeId: userId,
            },
          ],
        },
      });

      res.json({
        message: "Successfully fetched booths",
        booths,
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
