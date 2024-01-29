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
    HttpException,
    HttpStatus,
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
    async getRecipeTags() {
        return await this.recipesService.getRecipeTags();
    }

    @Post('/create')
    async postRecipe(@Body() postRecipeDto: PostRecipeDto) {
        try {
            return await this.recipesService.postRecipe(postRecipeDto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                console.log('error', error);
                throw new HttpException(
                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: 'ERROR: Creating recipe failed!',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
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
