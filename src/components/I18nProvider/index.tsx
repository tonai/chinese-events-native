import type {ILanguages, ITranslations} from '../../types';
import type {IGregorianDate} from 'date-chinese';
import type {ReactElement, ReactNode} from 'react';

import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {i18nContext} from '../../contexts/i18n';
// import {useStorage} from '../../hooks/useStorage';

import fr from '../../translations/fr-FR.json';

export const languages: ILanguages = {
  'en-US': {flag: '🇺🇸', label: 'English'},
  'fr-FR': {
    flag: '🇫🇷',
    label: 'Français',
    translations: () => Promise.resolve({default: fr}),
  },
};

interface II18nProviderProps {
  children: ReactNode;
}

export function I18nProvider(props: II18nProviderProps): ReactElement {
  const {children} = props;
  // const [language, setLanguage] = useStorage({
  //   defaultValue: 'en-US',
  //   key: 'language',
  // });
  const [language, setLanguage] = useState('en-US');
  // const [translations, setTranslations] = useStorage<ITranslations | null>({
  //   defaultValue: null,
  //   key: 'translations',
  // });
  const [translations, setTranslations] = useState<ITranslations | null>(null);

  const intl = useMemo(
    () => new Intl.DateTimeFormat(language, {dateStyle: 'full'}),
    [language],
  );

  const formatDate = useCallback(
    (gDate: IGregorianDate) => {
      return intl.format(new Date(gDate.year, gDate.month - 1, gDate.day));
    },
    [intl],
  );

  const translate = useCallback(
    (text: string, substitutions: Record<string, number | string> = {}) => {
      let translation =
        translations && text in translations ? translations[text] : text;
      for (const [key, value] of Object.entries(substitutions)) {
        translation = translation.replaceAll(`$${key}`, String(value));
      }
      return translation;
    },
    [translations],
  );

  const loadTranslations = useCallback(
    async (language: string): Promise<void> => {
      if (language in languages) {
        const {translations} = languages[language];
        if (translations) {
          const result = await translations();
          return setTranslations(result.default);
        }
      }
      setTranslations({});
    },
    [setTranslations],
  );

  const handleLanguageChange = useCallback(
    (language: string) => {
      setLanguage(language);
      return loadTranslations(language);
    },
    [loadTranslations, setLanguage],
  );

  const context = useMemo(
    () => ({
      formatDate,
      language,
      languages,
      setLanguage: handleLanguageChange,
      translate,
    }),
    [formatDate, handleLanguageChange, language, translate],
  );

  useEffect(() => {
    loadTranslations(language).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <i18nContext.Provider value={context}>{children}</i18nContext.Provider>
  );
}
