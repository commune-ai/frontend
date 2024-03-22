import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID! as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET! as string,
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };