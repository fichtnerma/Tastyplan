import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.SECRETKEY;

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const protectedPaths = ['/preferences'];
    const isPathProtected = protectedPaths?.some((path) => pathname == path);
    const res = NextResponse.next();

    if (isPathProtected) {
        const token = await getToken({ req, secret });
        console.log('token:', token);
        if (!token) {
            const url = new URL(`http://localhost:8080/authentication/login`, req.url);
            return NextResponse.redirect(url);
        }
    }
    return res;
}
