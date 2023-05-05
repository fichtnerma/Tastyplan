import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateShoppingListDto {
    @IsBoolean()
    @IsNotEmpty()
    isChecked: boolean;
}
