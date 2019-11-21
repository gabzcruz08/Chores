import i18n from 'i18next';
import Expo from 'expo';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  //detect: (callback) => { return Expo.Util.getCurrentLocaleAsync().then(lng => { console.log(lng); callback(lng); })  },
  detect: (callback) => { return  },
  init: () => {},
  cacheUserLanguage: () => {}
}

const translations = require('./translations.json')

i18n
  .use(languageDetector) // for non expo apps use https://github.com/DylanVann/i18next-react-native-language-detector
  .init({
    fallbackLng: 'en',
    load: 'languageOnly', // optional - load only languages without regions
    //whitelist: ['en', 'pt-BR'], // optional - allowed languages

    // have a common namespace used around the full app
    //ns: ['common'],
    //defaultNS: 'common',

    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
    resources: translations
  });


export default i18n;
