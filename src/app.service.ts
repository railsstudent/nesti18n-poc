import { Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class AppService {
  constructor(private i18n: I18nService) {}

  getGoodMorning(lang: string): Promise<any> {
    return this.i18n.translate('error.GOOD_MORNING', { lang })
  }

  getTranslatedMessage(lang: string): Promise<any> {
    return this.i18n.translate('error.SUBSCRIPTION_EXPIRED', {
      args: { email: 'abc@example.com' },
      lang,
    })
  }

  async getNestedTranslationMessage(lang: string, username: string): Promise<any> {
    const welcome = await this.i18n.translate('error.SETUP.WELCOME', {
      args: { username },
      lang,
    })
    const bye = await this.i18n.translate('error.SETUP.BYE', {
      args: { username },
      lang,
    })
    return `${welcome}, ${bye}`
  }

  getPluralizeTranslationMessage(lang: string, username: string, count: number): Promise<any> {
    return this.i18n.translate('error.SETUP.TOMATO', {
      args: { username, count },
      lang,
    })
  }
}
