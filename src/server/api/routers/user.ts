import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  findUnique: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: { slug: input.slug },
      });
    }),
});
