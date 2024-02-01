import { OptionalAuthGuard } from './jwt-auth.guard';
import { AuthService, RegistrationStatus } from './auth.service';
import { CreateGuestDto, CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(OptionalAuthGuard)
    @Post('register')
    public async register(@Req() request: Request, @Res() response: Response) {
        try {
            let result: RegistrationStatus;
            const user = request.user as User;
            const userDto: CreateUserDto = request.body;

            if (user && user.role === 'guest') {
                result = await this.authService.convertGuestToUser(user, userDto);
            } else {
                result = await this.authService.register(userDto);
            }

            if (!result.success) {
                throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
            }
            return response.sendStatus(HttpStatus.CREATED);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response): Promise<Response> {
        try {
            const { token, data } = await this.authService.login(loginUserDto);
            const loginToken = { token, ...data };
            return response.send(loginToken);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('guest')
    public async continueAsGuest(@Body() createGuestDto: CreateGuestDto, @Res() response: Response): Promise<Response> {
        try {
            const { token, data } = await this.authService.continueAsGuest(createGuestDto);
            const guestToken = { token, ...data };
            return response.send(guestToken);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('logout')
    public async logout(@Res() response: Response) {
        try {
            return response.sendStatus(HttpStatus.OK);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
