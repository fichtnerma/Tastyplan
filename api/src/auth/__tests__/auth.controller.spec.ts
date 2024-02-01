import { AuthService } from '../auth.service';
import { LoginReturnType } from '../auth.service';
import { AuthController } from '../auth.controller';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
import { CreateGuestDto } from 'src/users/dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
    let service: AuthService;
    let controller: AuthController;

    beforeEach(async () => {
        const mockUsersService = jest.fn(() => ({
            // mock methods here if needed
        }));

        const mockJwtService = jest.fn(() => ({
            // mock methods here if needed
        }));

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                { provide: UsersService, useValue: mockUsersService() },
                { provide: JwtService, useValue: mockJwtService() },
            ],
        }).compile();
        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('POST: register => Should register a user', () => {
        expect(true).toBeTruthy();
    });

    it('POST: guest => Should login a user', async () => {
        const mockLoginUserDto: LoginUserDto = { userId: 'test@email.com', password: 'test' };
        const mockResponse = { send: jest.fn() };
        const mockLoginResult: LoginReturnType = {
            token: { expiresIn: '24h', Authorization: 'Bearer testToken' },
            data: { userId: 'test' },
        };
        jest.spyOn(service, 'login').mockResolvedValue(mockLoginResult);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await controller.login(mockLoginUserDto, mockResponse as any);

        expect(service.login).toHaveBeenCalledWith(mockLoginUserDto);
        expect(mockResponse.send).toHaveBeenCalledWith({ token: mockLoginResult.token, ...mockLoginResult.data });
    });

    it('POST: login => Should use a guest login', async () => {
        const mockCreateGuestDto: CreateGuestDto = { userId: 'guestUser' };
        const mockResponse = { send: jest.fn() };
        const mockGuestResult = {
            token: { expiresIn: '24h', Authorization: 'Bearer testToken' },
            data: {
                id: '1',
                userId: 'guestUser',
                password: 'password',
                role: 'guest',
                state: 'active',
                createdAt: new Date('2024-02-05'),
                updatedAt: new Date('2024-02-05'),
            },
        };
        jest.spyOn(service, 'continueAsGuest').mockResolvedValue(mockGuestResult);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await controller.continueAsGuest(mockCreateGuestDto, mockResponse as any);

        expect(service.continueAsGuest).toHaveBeenCalledWith(mockCreateGuestDto);
        expect(mockResponse.send).toHaveBeenCalledWith({ token: mockGuestResult.token, ...mockGuestResult.data });
    });

    it('POST: logout => Should logout a guest', async () => {
        const mockResponse = { sendStatus: jest.fn() };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await controller.logout(mockResponse as any);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(HttpStatus.OK);
    });
});
