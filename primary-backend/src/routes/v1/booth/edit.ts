import { Router } from "express";
import express from "express";
import { UpdateBoothSchema } from "../../../schema";
import { prisma } from "../../../db";

export const editBoothHandler: Router = express.Router();

editBoothHandler.post("/", async (req, res) => {
  const { success, data } = UpdateBoothSchema.safeParse(req.body);
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

    await prisma.booth.update({
      where: {
        id: data.boothId,
      },
      data: {
        title: data.title,
        passed: data.passed,
      },
    });

    data.tasks?.map(async ({ taskId, content }) => {
      await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          name: content,
        },
      });
    });

    res.json({
      message: "Updated booth!",
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Error occured trying to update booth";

    res
      .json({
        message,
      })
      .status(400);
  }
});
