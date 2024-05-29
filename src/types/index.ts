import type {IGregorianDate} from 'date-chinese';

export type ITranslations = Record<string, string>;

export interface ILanguage {
  flag: string;
  label: string;
  translations?: () => Promise<{default: ITranslations}>;
}

export type ILanguages = Record<string, ILanguage>;

export interface II18nContext {
  formatDate: (gDate: IGregorianDate) => string;
  language: string;
  languages: ILanguages;
  setLanguage: (language: string) => void;
  translate: (
    text: string,
    substitutions?: Record<string, number | string>,
  ) => string;
}
