const { firebaseConfig } = require("./firebase-auth");
const { userConfig } = require("./user-auth");

const userEnv = {
  userEmail: process.env.FB_USER_EMAIL || userConfig.userEmail,
  userPassword: process.env.FB_USER_PASSWORD || userConfig.userPassword,
};

const firebaseEnv = {
  apiKey: process.env.FB_API_KEY || firebaseConfig.apiKey,
  authDomain: process.env.FB_AUTH_DOMAIN || firebaseConfig.authDomain,
  databaseURL: process.env.FB_DATABASE_URL || firebaseConfig.databaseURL,
  projectId: process.env.FB_PROJECT_ID || firebaseConfig.projectId,
  storageBucket: process.env.FB_STORAGE_BUCKET || firebaseConfig.storageBucket,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
  appId: process.env.FB_APP_ID || firebaseConfig.appId,
};

module.exports = {
  userEnv,
  firebaseEnv,
};
