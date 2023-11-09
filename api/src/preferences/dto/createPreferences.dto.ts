import { IsBoolean, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
    days: string[];

    @IsBoolean()
    wantsLunch: boolean;

    @IsBoolean()
    wantsDinner: boolean;

    @IsNumber()
    servings: number;
}
