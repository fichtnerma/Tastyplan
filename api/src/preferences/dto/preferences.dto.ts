import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreatePreferencesDto {

    @IsString()
    @IsNotEmpty()
    foodType: string

    @IsArray()
    @IsString({each: true})
    allergenes: string[]

    @IsArray()
    @IsString({each: true})
    foodDislikes: string[]
}