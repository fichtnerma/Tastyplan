import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PreferencesDto {
    @IsString()
    @IsNotEmpty()
    formOfDiet: string;

    @IsArray()
    @IsString({ each: true })
    allergenes: string[];

    @IsArray()
    @IsString({ each: true })
    foodDislikes: string[];
}
