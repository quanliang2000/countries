import { CurrencyCode } from '../constants/currency-code';
import * as Lodash from 'lodash';
import { ICurrency } from '../interfaces/currency';
import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';

export class Currency implements ICurrency {
  private code: CurrencyCode;
  private decimals: number;
  private names: Map<ISO6391LanguageCode, string>;

  public constructor(options: { code: CurrencyCode, decimals: number, names: { [languageCode in ISO6391LanguageCode]?: string } }) {
    this.code = options.code;
    this.decimals = options.decimals;
    this.names = new Map(Lodash.toPairs(options.names)) as Map<ISO6391LanguageCode, string>;

    if (this.decimals < 0) {
      throw new Error(`A currency decimals ust be >= 0.`);
    }

    if (!this.names.get(ISO6391LanguageCode.EN)) {
      throw new Error(`A currency requires an english name.`);
    }
  }

  public getCode() {
    return this.code;
  }

  public getDecimals(): number {
    return this.decimals;
  }

  public getName(languageCode: ISO6391LanguageCode): string | undefined {
    return this.names.get(languageCode);
  }
}