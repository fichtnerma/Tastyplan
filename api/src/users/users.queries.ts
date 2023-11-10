import { CreateGuestDto, CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersQueries {
    constructor(private prismaService: PrismaService) {}
    async findFirstUser(userId: string) {
        return await this.prismaService.user.findFirst({
            where: { userId: userId },
        });
    }
    async createUser(userDto: CreateUserDto, role: string, userStateRegistration: string, userPassword: string) {
        return await this.prismaService.user.create({
            data: {
                ...userDto,
                role: role,
                state: userStateRegistration,
                password: await hash(userPassword, 10),
            },
        });
    }
    async findFirstGuestUser(guestId: string) {
        return await this.prismaService.user.findFirst({
            where: { id: guestId },
        });
    }
    async updateUser(
        userId: string,
        userDto: CreateUserDto,
        role: string,
        userStateFinished: string,
        userPassword: string,
    ) {
        return await this.prismaService.user.update({
            where: { id: userId },
            data: {
                ...userDto,
                role: role,
                state: userStateFinished,
                password: await hash(userPassword, 10),
            },
        });
    }
    async createGuestUser(createGuestDto: CreateGuestDto, role: string) {
        return await this.prismaService.user.create({
            data: {
                ...createGuestDto,
                role: role,
            },
        });
    }
    async findUniqueUser(id: string) {
        return await this.prismaService.user.findUnique({
            where: { id },
        });
    }
    async updateUserPassword(userId: string, newPassword: string) {
        console.log('userId', userId, 'newPassword', newPassword);
        return await this.prismaService.user.update({
            where: { userId },
            data: { password: await hash(newPassword, 10) },
        });
    }

    async findUniqueUserByEmail(email: string) {
        return await this.prismaService.user.findUnique({
            where: { userId: email },
        });
    }
}
