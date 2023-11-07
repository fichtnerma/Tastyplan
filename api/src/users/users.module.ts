import { UsersService } from './users.service';
import { UsersQueries } from './users.queries';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    exports: [UsersQueries, UsersService],
    controllers: [UsersController],
    providers: [UsersService, PrismaService, UsersQueries],
})
export class UsersModule {}
