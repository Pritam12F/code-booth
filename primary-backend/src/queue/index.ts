import Queue from "bull";

export const codeQueue = new Queue("audio transcoding", {
  redis: { port: Number(process.env.REDIS_HOST), host: process.env.REDIS_PORT },
});
