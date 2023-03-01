import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  // protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: { slug: input.slug },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
        },
      });
    }),

  checkStreak: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    if (!user) throw new TRPCError({ code: "NOT_FOUND" });

    const giveStreakPoints =
      // days must be different
      new Date(user.lastSignOn).getDate() !== new Date().getDate() &&
      // last sign on must be less than 24 hours ago
      Date.now() - new Date(user.lastSignOn).getTime() < 1000 * 60 * 60 * 24;

    if (giveStreakPoints) {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          streak: user.streak + 1,
          lastSignOn: new Date(),
          points: {
            increment: Math.min(user.streak, 20),
          },
        },
      });
    }

    return {
      giveStreakPoints,
    };
  }),
});
