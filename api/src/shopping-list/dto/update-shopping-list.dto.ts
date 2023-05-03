import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateShoppingListDto {
    @IsNumber()
    @IsNotEmpty()
    ingredientId: number

    @IsBoolean()
    @IsNotEmpty()
    isChecked: boolean
}