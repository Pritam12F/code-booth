import { Router } from "express";
import express from "express";
import { FetchBoothSchema } from "../../../schema";
import { prisma } from "../../../db";
import { requireAuth } from "@clerk/express";

export const fetchBoothHandler: Router = express.Router();

fetchBoothHandler.post(
  "/",
  requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }),
  async (req, res) => {
    const { success, data } = FetchBoothSchema.safeParse(req.body);
    const userId = req.auth.userId;

    if (!success) {
      res
        .json({
          message: "Invalid inputs",
        })
        .status(411);

      return;
    }

    if (!userId) {
      res
        .json({
          message: "User ID not provided",
        })
        .status(401);

      return;
    }

    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        include: {
          booths: true,
        },
      });

      const hasAccess = user.booths.some(
        (x) =>
          (x.interviewerId === userId || x.interviewerId === userId) &&
          x.id === data.boothId
      );

      if (!hasAccess) {
        res
          .json({
            message: "User doesn't have access to this booth",
          })
          .status(405);
      }

      const booth = user.booths.find((x) => x.id === data.boothId);

      if (!booth) {
        res
          .json({
            message: "Booth not found",
          })
          .status(404);

        return;
      }

      res.json({
        message: "Fetched booth!",
        booth,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error occured trying to fetch booth";

      res
        .json({
          message,
        })
        .status(400);
    }
  }
);
