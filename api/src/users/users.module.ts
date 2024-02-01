import { UsersService } from './users.service';
import { UsersQueries } from './users.queries';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    exports: [UsersQueries, UsersService],
    providers: [UsersService, PrismaService, UsersQueries],
})
export class UsersModule {}
