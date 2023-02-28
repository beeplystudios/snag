import { z } from "zod";

export const createGoalSchema = z.object({
  content: z.string().max(100),
  description: z.string().optional(),
  frequency: z.number().optional(),
});
