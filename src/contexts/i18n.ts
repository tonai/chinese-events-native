import type {II18nContext} from '../types';

import {createContext} from 'react';

export const i18nContext = createContext<II18nContext>({
  formatDate: () => '',
  language: 'en-US',
  languages: {},
  setLanguage: () => null,
  translate: () => '',
});
