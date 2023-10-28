import { CreateWeekplan } from './weekplan.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeekplanQueries {
    constructor(private prismaService: PrismaService) {}
    async findManyWeekplans(userId: string) {
        return await this.prismaService.weekplan.findMany({
            where: {
                userId: userId,
            },
            include: {
                weekplanEntry: {
                    include: {
                        lunch: true,
                        dinner: true,
                    },
                },
            },
        });
    }
    async deleteManyWeekplanEntries(weekplanId: number) {
        return await this.prismaService.weekplanEntry.deleteMany({
            where: { weekplanId },
        });
    }
    async deleteWeekplan(id: number) {
        await this.prismaService.weekplan.delete({
            where: { id },
        });
    }
    async createWeekplan(weekplan: CreateWeekplan) {
        return await this.prismaService.weekplan.create({
            data: {
                ...weekplan,
                weekplanEntry: {
                    createMany: {
                        data: weekplan.weekplanEntry,
                    },
                },
            },
            include: {
                weekplanEntry: {
                    include: {
                        lunch: true,
                        dinner: true,
                    },
                },
            },
        });
    }
    async findFirstWeekplan(userId: string) {
        return await this.prismaService.weekplan.findFirst({
            where: {
                userId: userId,
            },
            include: { weekplanEntry: true },
        });
    }
    async findFirstWeekplanEntry(weekplanId: number, userId: string) {
        return await this.prismaService.weekplanEntry.findFirst({
            where: { id: weekplanId, weekplan: { userId: userId } },
            include: { weekplan: true },
        });
    }

    async updateWeekplanEntryLunchWithId(weekPlanEntryId: number, lunchId: number) {
        return await this.prismaService.weekplanEntry.update({
            where: { id: weekPlanEntryId },
            data: { lunchId: lunchId },
        });
    }
    async updateWeekplanEntryLunchWithoutId(weekplanEntryId: number) {
        await this.prismaService.weekplanEntry.update({
            where: { id: weekplanEntryId },
            data: { lunch: { disconnect: true } },
        });
    }
    async updateWeekplanEntryDinnerWithId(weekPlanEntryId: number, dinnerId: number) {
        await this.prismaService.weekplanEntry.update({
            where: { id: weekPlanEntryId },
            data: { dinnerId: dinnerId },
        });
    }
    async updateWeekplanEntryDinnerWithoutId(weekplanEntryId: number) {
        await this.prismaService.weekplanEntry.update({
            where: { id: weekplanEntryId },
            data: { dinner: { disconnect: true } },
        });
    }
}
