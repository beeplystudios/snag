import { createGoalSchema } from "@/shared/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const goalRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const TAKE = 20;

      const goals = await ctx.prisma.goal.findMany({
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          author: {
            select: {
              image: true,
              name: true,
              slug: true,
            },
          },
        },
        take: TAKE + 1,
      });

      const nextCursor = (goals.length > TAKE ? goals[TAKE]?.id : null) || null;

      return {
        goals,
        nextCursor,
      };
    }),

  getMine: protectedProcedure.query(async ({ ctx }) => {
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
          where: {
            id_authorId: { id: input.id, authorId: ctx.session.user.id },
          },
          data: {
            completedAt: new Date(),
          },
        }),
        ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
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
          where: {
            id_authorId: { id: input.id, authorId: ctx.session.user.id },
          },
          data: {
            completedAt: null,
          },
        }),
        ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            points: { decrement: 1 },
          },
        }),
      ]);
    }),

  motivate: protectedProcedure
    .input(
      z.object({
        goalId: z.string(),
        message: z.string(),
        points: z.number().min(1).max(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const goal = await ctx.prisma.goal.findUnique({
        where: {
          id: input.goalId,
        },
      });

      if (!goal) throw new TRPCError({ code: "NOT_FOUND" });

      await ctx.prisma.$transaction([
        // remove the points from the current user
        ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            points: { decrement: input.points },
          },
        }),
        // add the points to the goal author
        ctx.prisma.user.update({
          where: { id: goal.authorId },

          data: {
            points: { increment: input.points },
          },
        }),
        // send a message
        ctx.prisma.goalMessage.create({
          data: {
            message: input.message,
            points: input.points,
            goalId: input.goalId,
            senderId: ctx.session.user.id,
          },
        }),
      ]);
    }),
});
