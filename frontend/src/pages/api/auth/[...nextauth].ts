import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { UserCredentials } from 'src/types/types';

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const { userId, password } = credentials as unknown as UserCredentials;

                console.log('from authorize: ', userId, password);

                const res = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: 'username',
                        password: 'password123',
                    }),
                });

                console.log(res);

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                } else return null;
            },
        }),
    ],

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/authentication/login',
    },
});
