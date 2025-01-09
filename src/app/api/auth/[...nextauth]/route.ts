import NextAuth, { AuthOptions } from "next-auth";
import GitHubProdider from "next-auth/providers/github";

const authOptions: AuthOptions = {
  theme: {
    colorScheme: "dark",
  },
  providers: [
    GitHubProdider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
