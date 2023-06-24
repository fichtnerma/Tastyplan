export enum Role {
    user = 'user',
    admin = 'admin',
    guest = 'guest',
}

declare module 'next-auth' {
    interface User {
        role: Role;
        email: string;
        userId: string;
        state: string;
        token: { expires: string; Authorization: string };
    }

    interface Session extends DefaultSession {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: Role;
        email: string;
        userId: string;
        state: string;
        token: { expires: string; Authorization: string };
    }
}
