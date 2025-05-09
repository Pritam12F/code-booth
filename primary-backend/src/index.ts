import "dotenv/config";
import express from "express";
import { v1Router } from "./routes/v1";
import { WebSocketServer } from "ws";
import { prisma } from "./db";
import cors from "cors";
import webhookHandler from "./routes/v1/webhook/clerk";

const app = express();
const PORT = 3000;

app.use("/api/webhooks", webhookHandler);
app.use(express.json());
app.use(cors());
app.use("/v1", v1Router);

const httpServer = app.listen(PORT);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", async function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", async function message(data) {
    const { review, rating, boothId } = JSON.parse(data.toString());
    try {
      await prisma.rating.create({
        data: {
          content: rating,
          boothId,
        },
      });
      await prisma.review.create({
        data: {
          content: review,
          boothId,
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Some error occured";
      console.log(message);
    }
  });
});
