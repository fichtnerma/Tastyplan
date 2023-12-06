import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class RawStringCreateRecipeDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    totalTime?: string;

    @IsString()
    servings: string;

    @IsOptional()
    @IsString()
    tags?: string;

    @IsString()
    formOfDiet: string;

    @IsOptional()
    @IsString()
    ingredients?: string;

    @IsOptional()
    @IsString()
    steps?: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
}
