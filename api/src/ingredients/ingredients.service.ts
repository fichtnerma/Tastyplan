import IngredientsSearchService from './ingredientsSearch.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientsService {
    constructor(private prismaService: PrismaService, private ingredientSearchService: IngredientsSearchService) {}

    async searchForIngredients(name: string) {
        const results = await this.ingredientSearchService.search(name);
        if (!results.length) {
            return [];
        }
        return results;
    }
}
