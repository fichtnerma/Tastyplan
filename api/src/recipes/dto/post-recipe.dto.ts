import { IsString, IsOptional, IsArray, IsInt, IsNotEmpty, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class IngredientDto {
    @IsNumber()
    ingredientId: number;

    @IsOptional()
    @IsString()
    unit?: string;

    @IsOptional()
    @IsInt()
    quantity?: number;
}

class StepDto {
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsInt()
    stepCount: number;
}

export class PostRecipeDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    img?: string;

    @IsOptional()
    @IsInt()
    totalTime?: number;

    @IsInt()
    servings: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsString()
    formOfDiet: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => IngredientDto)
    ingredients?: IngredientDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StepDto)
    steps?: StepDto[];

    @IsNotEmpty()
    @IsString()
    userId: string;
}
