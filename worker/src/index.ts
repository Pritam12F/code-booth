import { Job } from "bull";
import { codeQueue } from "./queue";
import { uploadToS3 } from "./lib/upload-s3";
import { getReviewAndRating } from "./lib/generate-review";

const processCodeQueue = async (job: Job) => {
  const { BoothID, HTML, CSS, JS, Tasks } = job.data;

  await Promise.all([
    uploadToS3(HTML, "html", BoothID),
    uploadToS3(CSS, "css", BoothID),
    uploadToS3(JS, "js", BoothID),
  ]);

  const review = await getReviewAndRating(HTML, CSS, JS, Tasks);

  socket.send(JSON.stringify(review));
};

codeQueue.process(processCodeQueue);
