import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
    /* constructor(
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>,
    ) {}

    create(createIngredientDto: CreateIngredientDto) {
        return 'This action adds a new ingredient';
    }

    findAll() {
        return `This action returns all ingredients`;
    }

    async findOne(id: number) {
        const ingredient = await this.ingredientRepository.findOneBy({ id: id });
        if (ingredient) {
            return ingredient;
        }
        return null;
    }

    async findSimilarIngredients(name: string) {
        const similarIngredients = await this.ingredientRepository.findBy({ name: ILike(`%${name}%`) });
        return similarIngredients;
    }

    update(id: number, updateIngredientDto: UpdateIngredientDto) {
        return `This action updates a #${id} ingredient`;
    }

    remove(id: number) {
        return `This action removes a #${id} ingredient`;
    } */
}
