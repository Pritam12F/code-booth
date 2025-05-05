import { s3Client } from "../client/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadToS3 = async (
  content: string,
  contentType: "html" | "css" | "js",
  boothId: string
) => {
  const bucketName = "code-booth";
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: `${boothId}-${
        contentType === "html"
          ? "index.html"
          : contentType === "css"
          ? "style.css"
          : "script.js"
      }`,
      Body: content,
    })
  );
};
