import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PreferencesDto {
    @IsString()
    @IsNotEmpty()
    formOfDiet: string;

    @IsArray()
    @IsString({ each: true })
    allergens: string[];

    @IsArray()
    foodDislikes: { id: number; name: string }[];

    @IsArray()
    @IsString({ each: true })
    days: string[];

    @IsArray()
    @IsString({ each: true })
    meals: string[];

    @IsNumber()
    serving: number;
}
