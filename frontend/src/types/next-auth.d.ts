export enum Role {
    user = 'user',
    admin = 'admin',
}

declare module 'next-auth' {
    interface User {
        role: Role;
        email: string;
        firstName: string;
        lastName: string;
        userId: string;
    }

    interface Session extends DefaultSession {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: Role;
        email: string;
        firstName: string;
        lastName: string;
        userId: string;
    }
}
