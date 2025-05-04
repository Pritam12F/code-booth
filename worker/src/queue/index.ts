import Queue from "bull";

export const codeQueue = new Queue("audio transcoding", {
  redis: { port: 6379, host: "127.0.0.1", password: "foobared" },
});
