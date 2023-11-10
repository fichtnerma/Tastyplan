import { OptionalAuthGuard } from './jwt-auth.guard';
import { AuthService, RegistrationStatus } from './auth.service';
import { CreateGuestDto, CreateUserDto, LoginUserDto, RequestResetPasswortDto, ResetPasswordDto } from 'src/users/dto/create-user.dto';
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
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response): Promise<Response> {
        const { token, data } = await this.authService.login(loginUserDto);
        const loginToken = { token, ...data };
        return response.send(loginToken);
    }

    @Post('guest')
    public async continueAsGuest(@Body() createGuestDto: CreateGuestDto, @Res() response: Response): Promise<Response> {
        const { token, data } = await this.authService.continueAsGuest(createGuestDto);
        const guestToken = { token, ...data };
        return response.send(guestToken);
    }

    @Post('logout')
    public async logout(@Res() response: Response) {
        return response.sendStatus(HttpStatus.OK);
    }

    @Post('request-reset-password')
    public async requestResetPassword(@Body() resetResetPasswortDto: RequestResetPasswortDto, @Res() response: Response) {
        try {
            await this.authService.requestResetPassword(resetResetPasswortDto);
            return response.sendStatus(HttpStatus.OK);
        } catch (error) {
            if (error instanceof HttpException) {
                return response.status(error.getStatus()).json({ message: error.getResponse() });
            }
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An unexpected error occurred' });
        }
    }
    @Post('set-new-password')
    public async setNewPassword(@Body() resetPasswortDto: ResetPasswordDto, @Res() response: Response)

}
