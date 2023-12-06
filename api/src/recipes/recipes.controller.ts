import { RecipesSearchService } from './recipesSearch.service';
import { RecipesService } from './recipes.service';
import { RawStringCreateRecipeDto } from './dto/raw-string-create-recipe.dto';
import { PostRecipeDto } from './dto/post-recipe.dto';
import { RequestWithUser } from 'src/users/users.controller';
import { PreferencesService } from 'src/preferences/preferences.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Express } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpException, HttpStatus } from '@nestjs/common';
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
    UploadedFile,
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
    @UseInterceptors(FileInterceptor('image'))
    async postRecipe(
        @UploadedFile() file: Express.Multer.File,
        @Body() rawStringCreateRecipeDto: RawStringCreateRecipeDto,
    ) {
        try {
            // Check if file format is valid
            if (file && !['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.mimetype)) {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: 'ERROR: Invalid file type. Only png, jpeg, jpg and webp are allowed.',
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Check if file size is valid (less than or equal to 500KB)
            if (file && file.size > 1000 * 1024) {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: 'ERROR:Invalid file size. File size should be less than or equal to 500KB.',
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
            const postRecipeDto: PostRecipeDto = {
                ...rawStringCreateRecipeDto,
                totalTime: parseInt(rawStringCreateRecipeDto.totalTime),
                servings: parseInt(rawStringCreateRecipeDto.servings),
                tags: JSON.parse(rawStringCreateRecipeDto.tags),
                ingredients: JSON.parse(rawStringCreateRecipeDto.ingredients),
                steps: JSON.parse(rawStringCreateRecipeDto.steps),
            };
            // Transform the plain object to an instance of the class
            const recipe = plainToClass(PostRecipeDto, postRecipeDto);
            // Validate the transformed object
            const errors = await validate(recipe);
            if (errors.length > 0) {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: 'ERROR: Invalid Input values!',
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }

            return await this.recipesService.postRecipe(postRecipeDto, file);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
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
