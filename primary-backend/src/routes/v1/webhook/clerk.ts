import express, { Router } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { prisma } from "../../../db";

const webhookHandler: Router = express.Router();

webhookHandler.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const evt = await verifyWebhook(req);

      const payload = evt.data as any;
      const eventType = evt.type;

      if (eventType !== "user.created") {
        res.json({
          message: "Unknown event",
        });
      }

      const id = payload.id;

      await prisma.user.create({
        data: { id },
      });

      res.json({ message: "User added to db" });
    } catch (err) {
      console.error("Error verifying webhook:", err);
      res.status(400).send("Error verifying webhook");
    }
  }
);

export default webhookHandler;
