import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class PreferencesDto {

    @IsString()
    @IsNotEmpty()
    foodType: string

    @IsArray()
    @IsString({each: true})
    allergens: string[]

    @IsArray()
    @IsString({each: true})
    foodDislikes: string[]
}