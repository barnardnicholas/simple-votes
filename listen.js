const express = require("express");
const server = express();
const firebase = require("firebase");
const { firebaseEnv, userEnv } = require("./auth/auth");

// Initialize Firebase
firebase.initializeApp(firebaseEnv);

// Database Reference
const database = firebase.database();

// Include Auth
server.use(express.json());

server.get("/", (req, res) => {
  return res.send("Nick Barnard - Simple Votes v0.1 (Heroku)");
});

const { PORT = 9090 } = process.env;

server.listen(PORT, () => console.log(`Listening on ${PORT}...`));
