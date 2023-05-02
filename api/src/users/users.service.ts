import { UpdateUserDto } from './dto/update-user.dto';
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
        // // check if the user exists in the db
        const userInDb = await this.prismaService.user.findFirst({
            where: { userId: userDto.userId },
        });
        if (userInDb) {
            throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
        }

        const user = await this.prismaService.user.create({
            data: {
                ...userDto,
                role: Role.USER,
                password: await hash(userDto.password, 10),
            },
        });

        return user;
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
                password: await hash(userDto.password, 10),
            },
        });

        return user;
    }
    async createGuest(createGuestDto: CreateGuestDto): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                ...createGuestDto,
                role: Role.GUEST,
            },
        });

        return user;
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
    }

    //use by auth module to get user in database
    async findByPayload({ userId }: { userId: string }): Promise<User> {
        return await this.prismaService.user.findFirst({
            where: { userId },
        });
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user` + updateUserDto;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    private createGuestUser(createUserDto: CreateUserDto) {
        const { userId, role } = createUserDto;
        this.prismaService.user.create({
            data: {
                userId,
                role,
            },
        });
        return 'Guest user created';
    }
    private createUser(createUserDto: CreateUserDto) {
        const { userId, password, email, role } = createUserDto;
        this.prismaService.user.create({
            data: {
                userId,
                password,
                email,
                role,
            },
        });
        return 'User created';
    }
}
