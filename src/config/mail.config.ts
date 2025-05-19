import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'dotenv';
config();

const isProd = process.env.NODE_ENV === 'production';

export const mailConfig = {
  transport: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT as string, 10),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  defaults: {
    from: process.env.MAIL_FROM,
  },
  template: {
    dir: isProd
      ? join(__dirname, '..', 'templates') // dist/templates
      : join(process.cwd(), 'src', 'templates'), // src/templates,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
