import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
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
            async authorize(credentials, req) {
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
                const cookies = res.headers.get('set-cookie');

                if (res.ok && user) {
                    return user;
                } else return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
    },

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/authentication/login',
    },
});
