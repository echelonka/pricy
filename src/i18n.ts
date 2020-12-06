import i18next from 'i18next'
import I18NextHttpBackend from 'i18next-http-backend'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'

const detection = {
  order: ['path'],
}

export const fallbackLng = 'en'
export const supportedLngs = ['en', 'sv']
export const locales: Record<string, string> = {
  en: 'en-US',
  sv: 'sv-SE',
}

i18next
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    detection,
    fallbackLng,
    supportedLngs,
    keySeparator: false,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18next
