import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CronjobsQueries {
    constructor(private prismaService: PrismaService) {}

    async findManyUserIds() {
        return await this.prismaService.user.findMany({
            select: {
                userId: true,
            },
        });
    }
}
