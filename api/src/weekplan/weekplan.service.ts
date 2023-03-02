import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeekplanService {
    constructor(private prismaService: PrismaService) {}

    async create() {
        const week = [0, 1, 2, 3, 4, 5, 6];
        await this.delete();
        await this.prismaService.weekplan.create({
            data: {
                id: 1,
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                weekplanEntry: {
                    createMany: {
                        data: week.map((dayEntry) => ({
                            date: new Date(new Date().setDate(new Date().getDate() + dayEntry)),
                            recipeId: 1,
                        })),
                    },
                },
            },
        });

        return 'This action adds a new weekplan';
    }

    async delete(id = 1) {
        await this.prismaService.weekplan.delete({
            where: {
                id: 1,
            },
            include: {
                weekplanEntry: true,
            },
        });
    }

    async findById(id: number) {
        await this.create();
        const weekPlan = await this.prismaService.weekplan.findUnique({
            where: {
                id,
            },
            include: {
                weekplanEntry: true,
            },
        });
        return weekPlan;
    }
}
