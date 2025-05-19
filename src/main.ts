import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
// import { Queue } from 'bullmq';
// import * as express from 'express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { Queue as NestQueue } from 'bullmq';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');
  const mailQueue = new NestQueue('mail-queue', {
    connection: { host: 'localhost', port: 6379 },
  });

  createBullBoard({
    queues: [new BullMQAdapter(mailQueue)],
    serverAdapter,
  });
  app.use('/admin/queues', serverAdapter.getRouter());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJs Endpoint example')
    .setDescription('The NestJs Endpoint example API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access_token', // name of the security scheme, referenced later
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
