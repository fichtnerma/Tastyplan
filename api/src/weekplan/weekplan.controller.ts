import { WeekplanService } from './weekplan.service';
import { RequestWithUser } from 'src/users/users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import { Controller, Get, Post, ClassSerializerInterceptor, UseGuards, UseInterceptors, Req } from '@nestjs/common';

@Controller('weekplan')
export class WeekplanController {
    constructor(private weekplanService: WeekplanService) { }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/current')
    findOne(@Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.weekplanService.get(user);
    }

    /*     @UseGuards(JwtAuthGuard)
        @ApiSecurity('access-key')
        @UseInterceptors(ClassSerializerInterceptor) */
    @Post('/create')
    create(@Req() request: RequestWithUser) {
        const user = request.user as User;
        console.log(user)
        return this.weekplanService.create(
            {
                id: "f61d0b1c-77a3-4519-bbdc-3f8d71064643",
                userId: "gustav",
                email: "asasas@asas.de",
                password: "$2b$10$5mgbpyK.od1HPEhJbfd3cO2hMOPYW201iSvWqplKsFVZs/ATs3QHa",
                role: "user",
                firstName: "Max",
                lastName: "Mustermann"
            }
        );
    }
}
