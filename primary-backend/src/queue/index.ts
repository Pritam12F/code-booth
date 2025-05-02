import Bull from "bull";

export const codeQueue = new Bull("code", {
  redis: "localhost:6379",
});
