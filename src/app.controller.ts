import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { I18nLang } from 'nestjs-i18n';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('good-morning')
  getGoodMorning(@I18nLang() lang: string): Promise<any> {
    return this.appService.getGoodMorning(lang);
  }

  @Get('translated-message')
  getTranslatedMessage(@I18nLang() lang: string): Promise<any> {
    return this.appService.getTranslatedMessage(lang);
  }

  @Get('nested-message')
  getNestedTranslationMessage(@I18nLang() lang: string, @Query('username') username: string): Promise<any> {
    return this.appService.getNestedTranslationMessage(lang, username);
  }

  @Get('pluralize-message')
  getPluralizeTranslationMessage(@I18nLang() lang: string, @Query('username') username: string, @Query('numOfTimes') numOfTimes: string): Promise<any> {
    return this.appService.getPluralizeTranslationMessage(lang, username, numOfTimes);
  }

  @Get('bad-translated-exception')
  getTranslatedException(): Promise<any> {
    throw new BadRequestException({ key: 'error.EXCEPTION', args: { language: 'German' } })
  }

  @Get('bad')
  getException(): Promise<any> {
    throw new BadRequestException('Error message does not have translation')
  }
}
