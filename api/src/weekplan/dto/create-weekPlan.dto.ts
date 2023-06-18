import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeekPlanDto {
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    startDate: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    duration: number;
}
