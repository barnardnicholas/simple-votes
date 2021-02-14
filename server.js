// Import Firebase
const firebase = require("firebase");

// Auth variables
const { firebaseEnv } = require("./auth/auth");

// Initialize Firebase
firebase.initializeApp(firebaseEnv);

// Database Reference
const database = firebase.database();
