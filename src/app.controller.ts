import { BadRequestException, Controller, Get, ParseIntPipe, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { I18nLang } from 'nestjs-i18n'
import { AppService } from './app.service'

@ApiTags('I18n messages')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'Display i18n message of good morning',
  })
  @Get('good-morning')
  getGoodMorning(@I18nLang() lang: string): Promise<any> {
    return this.appService.getGoodMorning(lang)
  }

  @ApiOperation({
    description: 'Display an i18n message that accepts dynamic email',
  })
  @Get('translated-message')
  getTranslatedMessage(@I18nLang() lang: string): Promise<any> {
    return this.appService.getTranslatedMessage(lang)
  }

  @ApiOperation({
    description: 'Display i18n message of nested translations',
  })
  @ApiQuery({
    name: 'username',
    schema: {
      type: 'string',
      required: ['true'],
    },
  })
  @Get('nested-message')
  getNestedTranslationMessage(@I18nLang() lang: string, @Query('username') username: string): Promise<any> {
    return this.appService.getNestedTranslationMessage(lang, username)
  }

  @ApiOperation({
    description: 'Display i18n plural translation',
  })
  @ApiQuery({
    name: 'username',
    schema: {
      type: 'string',
      required: ['true'],
    },
  })
  @ApiQuery({
    name: 'numOfTimes',
    schema: {
      type: 'number',
      minimum: 0,
      required: ['true'],
    },
  })
  @Get('pluralize-message')
  getPluralizeTranslationMessage(
    @I18nLang() lang: string,
    @Query('username') username: string,
    @Query('numOfTimes', ParseIntPipe) numOfTimes: number,
  ): Promise<any> {
    const count = Math.max(numOfTimes, 0)
    return this.appService.getPluralizeTranslationMessage(lang, username, count)
  }

  @ApiOperation({
    description: 'Translate i118n exception message',
  })
  @Get('bad-translated-exception')
  getTranslatedException(): Promise<any> {
    throw new BadRequestException({ key: 'error.EXCEPTION', args: { language: 'German' } })
  }

  @ApiOperation({
    description: 'Throw exception that encapsulates a static error message',
  })
  @Get('bad')
  getException(): Promise<any> {
    throw new BadRequestException('Error message does not have translation')
  }
}
