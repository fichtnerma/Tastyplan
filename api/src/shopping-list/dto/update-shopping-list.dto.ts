import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateShoppingListDto {
    @IsBoolean()
    @IsNotEmpty()
    isChecked: boolean
}