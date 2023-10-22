import { RecipesService } from './recipes.service';
import { RequestWithUser } from 'src/users/users.controller';
import { PreferencesService } from 'src/preferences/preferences.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Controller, Get, Param, Req, UseGuards, UseInterceptors } from '@nestjs/common';

@Controller('recipes')
export class RecipesController {
    constructor(
        private readonly recipesService: RecipesService,
        private readonly preferancesService: PreferencesService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/recommend')
    public async findAll(@Req() request: RequestWithUser) {
        const user = request.user as User;
        const k = 5;
        const preferences = await this.preferancesService.getPreferences(user.userId);
        return this.recipesService.getRecommendations(k, preferences);
    }

    @Get(':id')
    public findOne(@Param('id') id: string) {
        return this.recipesService.findById(+id);
    }
}
