import { z } from "zod";

export const createGoalSchema = z.object({
  content: z.string().max(100),
  description: z.string(),
  frequency: z.number().min(1, "Frequency must be at least 1 day."),
});

export const sendMotivationSchema = z.object({
  message: z.string(),
  points: z.number().min(1).max(100),
});
