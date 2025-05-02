import { Router } from "express";
import express from "express";
import { DeleteBoothSchema } from "../../../schema";
import { prisma } from "../../../db";
import { requireAuth } from "@clerk/express";

export const deleteBoothRouter: Router = express.Router();

deleteBoothRouter.post(
  "/",
  requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }),
  async (req, res) => {
    const { success, data } = DeleteBoothSchema.safeParse(req.body);
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
        (x) => x.interviewerId === userId && x.id === data.boothId
      );

      if (!hasAccess) {
        res
          .json({
            message: "User doesn't have access to this booth",
          })
          .status(405);
      }

      await prisma.booth.delete({
        where: {
          id: data.boothId,
        },
      });

      res.json({
        message: "Deleted booth!",
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error occured trying to delete booth";

      res
        .json({
          message,
        })
        .status(400);
    }
  }
);
