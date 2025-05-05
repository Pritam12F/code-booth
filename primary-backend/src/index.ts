import "dotenv/config";
import express from "express";
import { v1Router } from "./routes/v1";
import { WebSocketServer } from "ws";
import { prisma } from "./db";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/v1", v1Router);

const httpServer = app.listen(PORT);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", async function connection(ws, req) {
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
