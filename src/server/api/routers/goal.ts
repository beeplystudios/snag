import { createGoalSchema, sendMotivationSchema } from "@/shared/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const goalRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.goal.findUniqueOrThrow({
        where: {
          id_authorId: {
            id: input.id,
            authorId: ctx.session.user.id,
          },
        },
        include: {
          messages: {
            include: {
              sender: true,
            },
          },
        },
      });
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        notBy: z.string().optional(),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const TAKE = 20;

      const goals = await ctx.prisma.goal.findMany({
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: {
          authorId: {
            not: input.notBy ? input.notBy : undefined,
          },
        },
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

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (goals.length > TAKE) {
        const nextItem = goals.pop();
        nextCursor = nextItem?.id;
      }

      return {
        goals,
        nextCursor,
      };
    }),

  getMine: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.goal.findMany({
      where: { authorId: ctx.session.user.id },
      include: {
        messages: {
          take: 4,
          include: {
            sender: {
              select: {
                image: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });
  }),

  getFromSlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.goal.findMany({
        where: { author: { slug: input.slug } },
        include: {
          author: {
            select: {
              image: true,
              name: true,
              slug: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(createGoalSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.goal.create({
        data: {
          nextTime: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 7 * input.frequency
          ),
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
      sendMotivationSchema.extend({
        goalId: z.string(),
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

  checkUncompleted: protectedProcedure.mutation(async ({ ctx }) => {
    const goals = await ctx.prisma.goal.updateMany({
      where: {
        authorId: ctx.session.user.id,
        nextTime: { lte: new Date() },
      },
      data: {
        completedAt: null,
      },
    });

    return goals;
  }),
});
