import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // here provide the providers, github, google, etc:
  providers: [GitHub],
});
