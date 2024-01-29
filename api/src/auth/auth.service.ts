import { JwtToken } from 'src/types/types';
import { JwtPayload } from './jwt.strategy';
import { FormatLogin, UsersService } from 'src/users/users.service';
import { CreateGuestDto, CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

type LoginReturnType = {
    token: JwtToken;
    data: FormatLogin;
};

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

    async continueAsGuest(createGuestDto: CreateGuestDto) {
        try {
            const user = await this.usersService.createGuest(createGuestDto);
            const token = this._createToken(user);
            return { token, data: user };
        } catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    }

    async convertGuestToUser(user: User, userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'ACCOUNT_CREATE_SUCCESS',
        };
        try {
            status.data = await this.usersService.createFromGuest(user, userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }
    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        const status: RegistrationStatus = {
            success: true,
            message: 'ACCOUNT_CREATE_SUCCESS',
        };

        status.data = await this.usersService.create(userDto);

        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginReturnType> {
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);

        return { token, data: user };
    }

    private _createToken({ userId }: FormatLogin): JwtToken {
        const user: JwtPayload = { userId };
        const Authorization = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            Authorization,
        };
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
export interface RegistrationStatus {
    success: boolean;
    message: string;
    data?: User;
}
export interface RegistrationSeederStatus {
    success: boolean;
    message: string;
    data?: User[];
}
