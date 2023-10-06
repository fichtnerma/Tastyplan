import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from './types/types';

const secret = process.env.SECRET_KEY;
const requireSetupPaths = ['/weekOverview', '/shoppingList'];
const protectedPaths = ['/setup', '/settings'].concat(requireSetupPaths);
const authPaths = ['/setup', '/authentication/login', '/authentication/register'];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const res = NextResponse.next();
    const token = await getToken({ req, secret });
    if (authPaths.some((path) => pathname == path)) {
        if (token?.state === 'finished') {
            if (pathname == '/authentication/register' && token?.role === Role.guest) {
                return res;
            }
            return NextResponse.redirect(new URL(`/weekOverview`, req.url));
        }
    }
    if (protectedPaths.some((path) => pathname == path)) {
        if (!token) {
            return NextResponse.redirect(new URL(`/authentication/login`, req.url));
        }
    } else if (requireSetupPaths.some((path) => pathname == path)) {
        if (token?.state !== 'finished') {
            return NextResponse.redirect(new URL(`/setup`, req.url));
        }
    }
    return res;
}
