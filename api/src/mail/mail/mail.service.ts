import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendUserConfirmation() {
        console.log('MAIL SERVICE: Sending user confirmation email...');
        await this.mailerService.sendMail({
            to: 'hannes.eckelt@t-online.de', // list of receivers
            from: 'noreply@hello.com', // sender address
            subject: 'Welcome to Hello.com ✔', // Subject line
            text: `Hello Hannes, thank you for registering on our site.`, // plaintext body
            html: `<b>Hello hannes</b><p>Thank you for registering on our site.</p>`, // HTML body content
        });
    }
}
