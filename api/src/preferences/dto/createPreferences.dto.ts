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
    days: number[];

    @IsArray()
    meals: number[];

    @IsNumber()
    serving: number;
}
