import { RecipesSearchService } from './recipesSearch.service';
import { RecipesService } from './recipes.service';
import { PostRecipeDto } from './dto/post-recipe.dto';
import { RequestWithUser } from 'src/users/users.interface';
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
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/recommend/:id')
    public async findAll(@Param('id') id: string, @Req() request: RequestWithUser) {
        try {
            const user = request.user as User;
            return this.recipesService.getRecommendations(id, user.userId);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/tags')
    async getRecipeTags() {
        try {
            return await this.recipesService.getRecipeTags();
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/create')
    async postRecipe(@Body() postRecipeDto: PostRecipeDto) {
        try {
            return await this.recipesService.postRecipe(postRecipeDto);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'ERROR: Creating recipe failed!',
                    cause: error,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/own')
    public async findOwn(@Req() request: RequestWithUser) {
        try {
            return await this.recipesService.findOwn(request.user.userId);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    public findOne(@Param('id') id: string) {
        try {
            return this.recipesService.findById(+id);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('')
    async getRecipes(@Query('search') search: string) {
        try {
            if (search) {
                return this.recipesSearchService.search(search);
            }
            return [];
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
