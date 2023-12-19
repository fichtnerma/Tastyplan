import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
    ArrayMinSize,
} from 'class-validator';
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
    @ArrayMinSize(1, { message: 'There must be at least one ingredient.' })
    ingredients?: IngredientDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StepDto)
    @ArrayMinSize(1, { message: 'There must be at least one step.' })
    steps?: StepDto[];

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    imageBase64?: string;
}
