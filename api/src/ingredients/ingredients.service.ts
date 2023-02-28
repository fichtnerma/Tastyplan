import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
    create(createIngredientDto: CreateIngredientDto) {
        return 'This action adds a new ingredient';
    }

    findAll() {
        return `This action returns all ingredients`;
    }

    async findOne(id: number) {
        return 'This action finds a ingredient';
    }

    async findSimilarIngredients(name: string) {
        return 'This action finds an ingredient with similar name';
    }

    update(id: number, updateIngredientDto: UpdateIngredientDto) {
        return `This action updates a #${id} ingredient`;
    }

    remove(id: number) {
        return `This action removes a #${id} ingredient`;
    }
}
