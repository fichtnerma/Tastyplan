import { UserState } from 'src/types/types';
import { CreateGuestDto, CreateUserDto, LoginUserDto, Role, UpdatePasswordDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface FormatLogin extends Partial<User> {
    userId: string;
}

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async create(userDto: CreateUserDto): Promise<User> {
        try {
            // check if the user exists in the db
            const userInDb = await this.prismaService.user.findFirst({
                where: { userId: userDto.userId },
            });
            if (userInDb) {
                throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
            }
        } catch (error) {
            throw new HttpException('finding user for creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            const user = await this.prismaService.user.create({
                data: {
                    ...userDto,
                    role: Role.USER,
                    state: UserState.registration,
                    password: await hash(userDto.password, 10),
                },
            });

            return user;
        } catch (error) {
            throw new HttpException('creating user failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createFromGuest(guest: User, userDto: CreateUserDto): Promise<User> {
        const userInDb = await this.prismaService.user.findFirst({
            where: { id: guest.id },
        });
        if (!userInDb) {
            throw new HttpException('unable to convert guest user', HttpStatus.CONFLICT);
        }
        const user = await this.prismaService.user.update({
            where: { id: userInDb.id },
            data: {
                ...userDto,
                role: Role.USER,
                state: UserState.finished,
                password: await hash(userDto.password, 10),
            },
        });

        return user;
    }
    async createGuest(createGuestDto: CreateGuestDto): Promise<User> {
        try {
            const user = await this.prismaService.user.create({
                data: {
                    ...createGuestDto,
                    role: Role.GUEST,
                },
            });

            return user;
        } catch (error) {
            throw new HttpException('creating guest failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePassword(payload: UpdatePasswordDto, id: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
        }
        // compare passwords
        const areEqual = await compare(payload.old_password, user.password);
        if (!areEqual) {
            throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
        }
        return await this.prismaService.user.update({
            where: { id },
            data: { password: await hash(payload.new_password, 10) },
        });
    }

    async findByLogin({ userId, password }: LoginUserDto): Promise<FormatLogin> {
        try {
            const user = await this.prismaService.user.findFirst({
                where: { userId },
            });

            if (!user) {
                throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
            }

            // compare passwords
            const areEqual = await compare(password, user.password);

            if (!areEqual) {
                throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: p, ...rest } = user;
            return rest;
        } catch (error) {
            throw new HttpException('finding user by login failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //use by auth module to get user in database
    async findByPayload({ userId }: { userId: string }): Promise<User> {
        try {
            return await this.prismaService.user.findFirst({
                where: { userId },
            });
        } catch (error) {
            throw new HttpException('finding user by payload failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
