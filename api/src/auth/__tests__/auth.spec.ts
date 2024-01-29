import { setupPrismaService } from 'tests/test.util';
import { UsersService } from 'src/users/users.service';
import { UsersQueries } from 'src/users/users.queries';
import { CreateUserDto, Role } from 'src/users/dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

/**
 * @group integration
 */

describe('App (e2e)', () => {
    let authService: AuthService;

    beforeAll(async () => {
        const jwtService = new JwtService();
        const prismaService = await setupPrismaService();
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
    });
});
