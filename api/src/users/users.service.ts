import { UserState } from 'src/types/types';
import { UsersQueries } from './users.queries';
import { CreateGuestDto, CreateUserDto, LoginUserDto, Role } from './dto/create-user.dto';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface FormatLogin extends Partial<User> {
    userId: string;
}

@Injectable()
export class UsersService {
    constructor(private usersQueries: UsersQueries) {}
    async create(userDto: CreateUserDto): Promise<User> {
        // check if the user exists in the db
        const userInDb = await this.usersQueries.findFirstUser(userDto.userId);
        if (userInDb) {
            throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
        }

        try {
            return await this.usersQueries.createUser(userDto, Role.USER, UserState.registration, userDto.password);
        } catch (error) {
            throw new HttpException('creating user failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createFromGuest(guest: User, userDto: CreateUserDto): Promise<User> {
        const userInDb = await this.usersQueries.findFirstGuestUser(guest.id);
        if (!userInDb) {
            throw new HttpException('unable to convert guest user', HttpStatus.CONFLICT);
        }
        return await this.usersQueries.updateUser(
            userInDb.id,
            userDto,
            Role.USER,
            UserState.finished,
            userDto.password,
        );
    }
    async createGuest(createGuestDto: CreateGuestDto): Promise<User> {
        try {
            return await this.usersQueries.createGuestUser(createGuestDto, Role.GUEST);
        } catch (error) {
            throw new HttpException('creating guest failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePassword(userId: string, password: string) {
        return await this.usersQueries.updateUserPassword(userId, password);
    }

    async findByLogin({ userId, password }: LoginUserDto): Promise<FormatLogin> {
        try {
            const user = await this.usersQueries.findFirstUser(userId);
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
            return await this.usersQueries.findFirstUser(userId);
        } catch (error) {
            throw new HttpException('finding user by payload failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
