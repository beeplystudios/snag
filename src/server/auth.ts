/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { customSlugify } from "@/utils/customSlugify";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.slug = user.slug;
        session.user.image = user.image;
        session.user.name = user.name;
        session.user.points = user.points;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile: async (profile) => {
        const slug = customSlugify(profile.name as string);

        const hasNameCollision = await prisma.user.findUnique({
          where: { slug },
        });
        let count = 2;
        // check if a person with the slug already exists
        if (hasNameCollision) {
          while (true) {
            if (
              !(await prisma.user.findUnique({
                where: { slug: slug + "-" + count.toString() },
              }))
            ) {
              break;
            }
            count++;
          }
        }

        return {
          id: profile.sub as string,
          name: profile.name as string,
          email: profile.email as string,
          slug: hasNameCollision ? slug + "-" + count.toString() : slug,
          emailVerified: new Date(),
          points: 500,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
