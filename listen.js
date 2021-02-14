const express = require("express");
const server = express();
const firebase = require("firebase");
const { get } = require("https");
const { firebaseEnv, userEnv } = require("./auth/auth");

// const { fbSignIn, getAllVotes, addVote } = require("./controllers/controllers");
// const { userSignIn } = require("./models/models");

// Initialize Firebase
firebase.initializeApp(firebaseEnv);

// Database Reference
const database = firebase.database();

// database
//   .ref(`/votes`)
//   .set({ yes: 0, no: 0 })
//   .then(() => {
//     console.log("Successfully posted log entry.");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

server.use(express.json());

const userSignIn = (email, password) => {
  console.log(`Signing in as ${email}...`);
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const getAllVotes = () => {
  return database
    .ref("/votes")
    .once("value")
    .then((snapshot) => {
      return new Promise((resolve, reject) => {
        resolve(snapshot.val());
      });
    });
};

const postVote = ({ vote }) => {
  return database
    .ref(`/votes`)
    .once("value")
    .then((snapshot) => {
      let { yes = 0, no = 0 } = snapshot.val();
      if (vote === "yes") yes++;
      else if (vote === "no") no++;
      return new Promise((resolve, reject) => {
        database
          .ref("/votes")
          .set({ yes, no })
          .then((votes) => {
            return resolve({ yes, no });
          });
      });
    });
};

server.get("/", (req, res) => {
  return res.send("Nick Barnard - Simple Votes v0.1 (Heroku)");
});

server.get("/votes", (req, res) => {
  userSignIn(userEnv.userEmail, userEnv.userPassword)
    .then(() => {
      return getAllVotes();
    })
    .then((votes) => {
      console.log(votes);
      return res.send({ votes });
    })
    .catch((e) => {
      console.log(e);
    });
});

server.post("/votes", (req, res) => {
  userSignIn(userEnv.userEmail, userEnv.userPassword)
    .then(() => {
      return postVote(req.body);
    })
    .then((votes) => {
      console.log("Votes: ", votes);
      res.send({ votes });
    });
});

const { PORT = 9090 } = process.env;

server.listen(PORT, () => console.log(`Listening on ${PORT}...`));
