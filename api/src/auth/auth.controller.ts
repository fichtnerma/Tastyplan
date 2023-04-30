import { AuthService, RegistrationStatus } from './auth.service';
import { CreateGuestDto, CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(createUserDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response): Promise<Response> {
        const { cookie, data } = await this.authService.login(loginUserDto);
        response.setHeader('Set-Cookie', cookie);
        return response.send(data);
    }

    @Post('guest')
    public async registerGuest(@Body() createGuestDto: CreateGuestDto, @Res() response: Response): Promise<Response> {
        const { cookie, data } = await this.authService.registerGuest(createGuestDto);

        response.setHeader('Set-Cookie', cookie);
        return response.send(data);
    }

    @Post('logout')
    public async logout(@Res() response: Response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return response.sendStatus(200);
    }
}
