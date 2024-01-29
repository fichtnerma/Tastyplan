import { AuthModule } from '../auth.module';
import { setupPrismaService } from 'tests/test.util';
import * as request from 'supertest';
import { CreateUserDto, Role } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
/**
 * @group integration
 */

describe('Auth Module (integration)', () => {
    let authService: AuthService;
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AuthModule],
            providers: [PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(await setupPrismaService())
            .compile();

        app = module.createNestApplication();
        authService = module.get<AuthService>(AuthService);
        await app.init();
        // const jwtService = new JwtService();
        // const prismaService = await setupPrismaService();
        // const userQueries = new UsersQueries(prismaService);
        // const usersService = new UsersService(userQueries);
        // authService = new AuthService(jwtService, usersService);
    }, 50000);
    afterAll(async () => {
        await app.close();
    });

    // it('/register', async () => {
    //     const user: CreateUserDto = {
    //         userId: 'userId',
    //         password: 'password',
    //         role: Role.USER,
    //     };
    //     const status = await authService.register(user);
    //     expect(status.success).toBe(true);
    // });
    it('/register', async () => {
        const user: CreateUserDto = {
            userId: 'userId',
            password: 'password',
            role: Role.USER,
        };
        request(app.getHttpServer())
            .post('/auth/register')
            .send(user)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual({
                    success: true,
                    message: 'ACCOUNT_CREATE_SUCCESS',
                });
            });
    });
});
