export type RequestWithUser = Request & { user: { id: string; userId: string }; cookies: { [key: string]: string } };
