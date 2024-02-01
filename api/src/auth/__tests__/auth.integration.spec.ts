import { setupPrismaService } from 'tests/test.util';
import { UsersService } from 'src/users/users.service';
import { UsersQueries } from 'src/users/users.queries';
import { CreateGuestDto, CreateUserDto, Role } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
/**
 * @group integration
 */

describe('Auth (integration)', () => {
    let authService: AuthService;
    let prismaService: PrismaService;

    beforeAll(async () => {
        const jwtService = new JwtService({ secret: 'secret' });
        prismaService = await setupPrismaService();
        const userQueries = new UsersQueries(prismaService);
        const usersService = new UsersService(userQueries);
        authService = new AuthService(jwtService, usersService);
    }, 50000);

    it('/register', async () => {
        const user: CreateUserDto = {
            userId: 'userId',
            password: 'password',
            role: Role.USER,
        };
        const status = await authService.register(user);
        expect(status.success).toBe(true);
        const userFromDb = await prismaService.user.findUnique({
            where: { userId: user.userId },
        });
        expect(userFromDb).toBeDefined();
    });

    it('/login', async () => {
        const user: CreateUserDto = {
            userId: 'userId12',
            password: 'password',
            role: Role.USER,
        };
        await authService.register(user);
        const token = await authService.login(user);
        expect(token).toBeDefined();
    });

    it('/continueAsGuest', async () => {
        const user: CreateGuestDto = {
            userId: 'userId123',
        };
        const { token } = await authService.continueAsGuest(user);
        expect(token).toBeDefined();
    });
});
