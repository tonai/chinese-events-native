import type {II18nContext} from '../types';

import {useContext} from 'react';

import {i18nContext} from '../contexts/i18n';

export function useI18n(): II18nContext {
  return useContext(i18nContext);
}
