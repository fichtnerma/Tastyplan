import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: `A list of user's roles`,
        example: ['admin'],
    })
    @IsString()
    @IsNotEmpty()
    role: Role;
}

export class CreateGuestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;
}

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly userId: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}

export class UpdatePasswordDto {
    @IsNotEmpty()
    @ApiProperty()
    new_password: string;

    @IsNotEmpty()
    @ApiProperty()
    old_password: string;
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}
