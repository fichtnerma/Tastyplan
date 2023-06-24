import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import { UserCredentials } from 'src/types/types';

export default NextAuth({
    secret: 'qY6aYs7lKasdgxuoEhQOMJiahxL56OzcGS+lXZlaUo4=',
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { userId, password } = credentials as unknown as UserCredentials;
                let res: Response;
                if (password && userId) {
                    res = await fetch('http://api:3000/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userId,
                            password: password,
                        }),
                    });
                } else {
                    res = await fetch('http://api:3000/auth/guest', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: uuidv4(),
                        }),
                    });
                }

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
                token.userId = user.userId;
                token.state = user.state;
                token.token = user.token;
            }

            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.email = token.email;
                session.user.userId = token.userId;
                session.user.state = token.state;
                session.user.token = token.token;
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
