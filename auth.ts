import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { USER_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // here provide the providers, github, google, etc:
  providers: [GitHub],
  callbacks: {
    // callback for signin
    async signIn({ user: { name, email }, profile }) {
      // we fetch whether a user exists
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(USER_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

      if (!existingUser) {
        // this means the usr does not exist
        await writeClient.create({
          _type: "user",
          id: profile?.id,
          name,
          email,
        });
      }

      return true;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },

    //callback for jwt
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // if the user exists on our database, we get it from that
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(USER_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user._id;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
