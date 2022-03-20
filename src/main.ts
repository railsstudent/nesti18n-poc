import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import helmet from 'helmet'
import * as express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(helmet())
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true }))

  const config = new DocumentBuilder()
    .setTitle('Nestjs-i18n example')
    .setDescription('I18n API description')
    .setVersion('1.0')
    .addTag('i18n')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(3001)
}
bootstrap()
