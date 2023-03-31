import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

import { UserCredentials } from 'src/types/types';

export default NextAuth({
    secret: process.env.SECRETKEY,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { userId, password } = credentials as unknown as UserCredentials;

                const res = await fetch('http://api:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        password: password,
                    }),
                });

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                } else return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.email = user.email;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.userId = user.userId;
            }

            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.email = token.email;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.userId = token.userId;
            }

            return session;
        },

        async redirect({ url }) {
            return url;
        },
    },

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/authentication/login',
    },
});
