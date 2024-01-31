import { WeekplanService } from './weekplan.service';
import { CreateByDateDto } from './dto/create-by-date.dto';
import { ChangeRecipeDto } from './dto/change-recipe.dto';
import { RequestWithUser } from 'src/users/users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

@Controller('weekplan')
export class WeekplanController {
    constructor(private weekplanService: WeekplanService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/current')
    findOne(@Req() request: RequestWithUser) {
        try {
            const user = request.user as User;
            return this.weekplanService.current(user.userId);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':date')
    findByStartDate(@Param() date: { date: Date }, @Req() request: RequestWithUser) {
        try {
            const user = request.user as User;
            return this.weekplanService.findByDate(user.userId, date.date);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/create')
    create(@Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.weekplanService.create(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/createForDate')
    createForDate(@Req() request: RequestWithUser, @Body() createByDateDto: CreateByDateDto) {
        const user = request.user as User;
        const dateObj = new Date(createByDateDto.date);

        return this.weekplanService.createFutureWeekplan(user.userId, dateObj, createByDateDto.shouldReplace);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/regenerate')
    regenerate(@Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.weekplanService.regenerate(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/changeRecipe')
    changeRecipe(@Body() changeRecipeReq: ChangeRecipeDto, @Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.weekplanService.changeRecipe(changeRecipeReq, user);
    }
}
