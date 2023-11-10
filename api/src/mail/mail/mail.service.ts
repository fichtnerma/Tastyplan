import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendResetPasswordMail(email: string, resetUrl: string) {
        await this.mailerService.sendMail({
            to: email, // list of receivers
            from: 'contact@tastyplan.com', // sender address
            subject: 'Reset your TastyPlan password ✔', // Subject line
            text: `Hello, you tried to reset your password. Please click to reset: ${resetUrl}`, // plaintext body
            html: `<b>Hello, </b><p>you tried to reset your password. 
            Please click <a href="${resetUrl}">here</a> to reset it.</p>`, // HTML body content
        });
    }
}
