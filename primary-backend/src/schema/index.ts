import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const BoothSchema = z.object({
  id: z.number(),
  interviewerId: z.string(),
  intervieweeId: z.string(),
  title: z.string(),
  passed: z.boolean(),
});

export const TaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  boothId: z.number(),
});

export const ReviewSchema = z.object({
  id: z.number(),
  content: z.string().optional(),
  boothId: z.number(),
});

export const RatingSchema = z.object({
  id: z.number(),
  content: z.string().optional(),
  boothId: z.number(),
});

export const CreateBoothSchema = z.object({
  interviewerId: z.string(),
  intervieweeId: z.string(),
  title: z.string(),
  tasks: z.array(z.string()).optional(),
});

export const UpdateBoothSchema = z.object({
  boothId: z.number(),
  title: z.string().optional(),
  passed: z.boolean().optional(),
  tasks: z
    .array(
      z.object({
        taskId: z.number(),
        content: z.string(),
      })
    )
    .optional(),
});

export const DeleteBoothSchema = z.object({
  boothId: z.number(),
});

export const FetchBoothSchema = z.object({
  boothId: z.number(),
});

export const CodeSchema = z.object({
  BoothID: z.string(),
  HTML: z.string(),
  CSS: z.string(),
  JS: z.string(),
  Tasks: z.array(z.string()),
});
