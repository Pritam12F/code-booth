import { Job } from "bull";
import { codeQueue } from "./queue";
import { ai } from "./client/llm";

const processCodeQueue = async (job: Job) => {
  const { BoothID, HTML, CSS, JS, Tasks } = job.data;

  console.log(HTML, CSS, BoothID, JS, Tasks);
};

codeQueue.process(processCodeQueue);
