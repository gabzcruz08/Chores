import { Constants } from 'expo'

const ENV = {
  dev: {
    apiUrl: 'https://staging.chores.ae/api',
    paypalUrl: 'https://api.sandbox.paypal.com',
    valuePrivacyURL: 'https://staging.chores.ae/page/app/privacy-policy',
    valueTermsAndConditionURL: 'https://staging.chores.ae/page/app/terms-and-condition',
  },
  prod: {
    apiUrl: 'https://www.chores.ae/api',
    paypalUrl: 'https://api.paypal.com',
    valuePrivacyURL: 'https://www.chores.ae/page/app/privacy-policy',
    valueTermsAndConditionURL: 'https://www.chores.ae/page/app/terms-and-condition',
  },
  staging: {
    apiUrl: 'https://staging.chores.ae/api',
    paypalUrl: 'https://api.sandbox.paypal.com',
    valuePrivacyURL: 'https://staging.chores.ae/page/app/privacy-policy',
    valueTermsAndConditionURL: 'https://staging.chores.ae/page/app/terms-and-condition',
  },
}

function getEnvVars(releaseChannel) {
  if (releaseChannel === undefined) {
    return ENV.dev
  }
  else if (releaseChannel.indexOf('prod') !== -1) {
    return ENV.prod
  }
  else if (releaseChannel.indexOf('staging') !== -1) {
    return ENV.staging
  }

  return ENV.dev
}

export const API_URL = getEnvVars(Constants.manifest.releaseChannel).apiUrl;

export const PAYPAL_URL = getEnvVars(Constants.manifest.releaseChannel).paypalUrl;

// Terms And Condition WebView URL
export const valueTermsAndConditionURL = getEnvVars(Constants.manifest.releaseChannel).valuePrivacyURL;
// Privacy Policy WebView URL
export const valuePrivacyURL = getEnvVars(Constants.manifest.releaseChannel).valueTermsAndConditionURL;
export const defaultStateIdDubai = 1;
export const defaultStateNameDubai = 'Dubai';
export const GMAP_KEY = 'AIzaSyCCszXsWNXiImeEwr8ht9Kb4gHHH6MxoS8';

console.disableYellowBox = true;

console.ignoredYellowBox = ['Warning: ...'];
