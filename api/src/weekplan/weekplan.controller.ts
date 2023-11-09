import { WeekplanService } from './weekplan.service';
import { ChangeRecipeDto } from './dto/change-recipe.dto';
import { RequestWithUser } from 'src/users/users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
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
        const user = request.user as User;
        return this.weekplanService.current(user.userId);
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
