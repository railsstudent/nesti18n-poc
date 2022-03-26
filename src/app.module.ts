import { AllExceptionsFilter } from './all-exceptions.filter'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n'
import * as path from 'path'

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['language'])],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
