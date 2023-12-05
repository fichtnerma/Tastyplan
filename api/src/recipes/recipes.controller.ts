import { RecipesSearchService } from './recipesSearch.service';
import { RecipesService } from './recipes.service';
import { PostRecipeDto } from './dto/post-recipe.dto';
import { RequestWithUser } from 'src/users/users.controller';
import { PreferencesService } from 'src/preferences/preferences.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

@Controller('recipes')
export class RecipesController {
    constructor(
        private readonly recipesService: RecipesService,
        private readonly recipesSearchService: RecipesSearchService,
        private readonly preferencesService: PreferencesService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/recommend/:id')
    public async findAll(@Param('id') id: string, @Req() request: RequestWithUser) {
        const user = request.user as User;
        const k = 5;
        const preferences = await this.preferencesService.getPreferences(user.userId);
        return this.recipesService.getRecommendations(k, preferences, id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/tags')
    getRecipeTags() {
        return this.recipesService.getRecipeTags();
    }

    @Post('/create')
    async postRecipe(@Req() request: RequestWithUser, @Body() postRecipeDto: PostRecipeDto) {
        return await this.recipesService.postRecipe(postRecipeDto);
    }

    @Get(':id')
    public findOne(@Param('id') id: string) {
        return this.recipesService.findById(+id);
    }

    @Get('')
    async getRecipes(@Query('search') search: string) {
        if (search) {
            return this.recipesSearchService.search(search);
        }
        return [];
    }
}
