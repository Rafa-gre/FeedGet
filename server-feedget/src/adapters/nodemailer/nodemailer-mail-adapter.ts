import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const  transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ad7a5badce6550",
    pass: "b762218fbe378a"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({subject, body} : SendMailData) {
    await transport.sendMail({
      from: 'Equipe FeedGet <oi@feedget.com>',
      to: 'Rafael Gregorini <rafael@gregorini.com.br>',
      subject,
      html: body
    });
  }

}