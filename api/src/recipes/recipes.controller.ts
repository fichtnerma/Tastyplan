import { RecipesService } from './recipes.service';
import { RequestWithUser } from 'src/users/users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Controller, Get, Param, Req, UseGuards, UseInterceptors } from '@nestjs/common';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipesService.findById(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/recommendations')
    getKRecipes(@Req() request: RequestWithUser) {
        const user = request.user as User;
        const k = 5;
        return this.recipesService.getRecommendations(k, user);
    }
}
