const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
const { body, validationResult } = require("express-validator");
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get("/hello", (req, res) => {
  res.end("Received GET request!");
});

const userCreationValidators = [
  body("email").isEmail(),
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("age").isInt(),
  body("password").isLength({ min: 5 }),
  body("userType").notEmpty().isIn(["admin", "customer"]),
  body("language").optional().isIn(["javascript", "python", "C#"]),
];

app.post("/hello", userCreationValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body;
  await admin.firestore().collection("users").add(user);

  res.status(201).send();
});

// app.post("/hello", (req, res) => {
//   // res.status(200);
//   // res.end(req.body);
//   res.end("Received GET request!");
// });
// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);

admin.initializeApp(functions.config().firebase);
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.status(200).send("Hello, World!");
});
