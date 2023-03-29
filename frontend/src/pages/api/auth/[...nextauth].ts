import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';
import { UserCredentials } from 'src/types/types';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const { userId, password } = credentials as unknown as UserCredentials;

                console.log('from authorize: ', userId, password);

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

                console.log(res);

                const user = await res.json();

                console.log(user);

                if (res.ok && user) {
                    return NextResponse.redirect('/preferences');
                } else return null;
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
    },

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/authentication/login',
    },
});
