import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Languagedetector from 'i18next-browser-languagedetector'

i18next
.use(initReactI18next)
.use(Languagedetector)
.init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                play: 'Play'
            }
        },
        tr: {
            translation: {
                play: 'Oyna'
            }
        }
    }
})