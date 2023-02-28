import { createGoalSchema } from "@/shared/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const goalRouter = createTRPCRouter({
  getMine: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.prisma.goal.findMany({
      where: { authorId: ctx.session.user.id },
    });
  }),

  create: protectedProcedure
    .input(createGoalSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.goal.create({
        data: {
          content: input.content,
          description: input.description,
          frequency: input.frequency,
          authorId: ctx.session.user.id,
        },
      });
    }),
});
