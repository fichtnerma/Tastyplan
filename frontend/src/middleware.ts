import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET_KEY;

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const protectedPaths = ['/preferences'];
    const isPathProtected = protectedPaths?.some((path) => pathname == path);
    const res = NextResponse.next();

    if (isPathProtected) {
        const token = await getToken({ req, secret });
        if (!token) {
            const url = new URL(`http://frontend:8080/authentication/login`, req.url);
            return NextResponse.redirect(url);
        }
    }
    return res;
}
