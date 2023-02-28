import { createGoalSchema } from "@/shared/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const goalRouter = createTRPCRouter({
  getMine: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.prisma.goal.findMany({
      where: { authorId: ctx.session.user.id },
    });
  }),

  getFromSlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.goal.findMany({
        where: { author: { slug: input.slug } },
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
