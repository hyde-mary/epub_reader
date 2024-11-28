import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // here provide the providers, github, google, etc:
  providers: [],
});
