import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        const user = JSON.parse(credentials.user);
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.uid;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.uid = token.uid as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
