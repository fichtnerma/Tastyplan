import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from 'src/mail/mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: process.env.EXPIRES_IN,
            },
        }),
        MailModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtStrategy, PrismaService],
    exports: [PassportModule, JwtModule],
})
export class AuthModule {}
