import { createGoalSchema } from "@/shared/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

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

  complete: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction([
        ctx.prisma.goal.update({
          where: { id: input.id },
          data: {
            completedAt: new Date(),
          },
        }),
        ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            points: { increment: 1 },
          },
        }),
      ]);
    }),

  uncomplete: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction([
        ctx.prisma.goal.update({
          where: { id: input.id },
          data: {
            completedAt: null,
          },
        }),
        ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            points: { decrement: 1 },
          },
        }),
      ]);
    }),
});
