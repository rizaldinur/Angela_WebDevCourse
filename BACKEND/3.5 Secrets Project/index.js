//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var password;
app.use(bodyParser.urlencoded({ extended: true }));

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${res.statusCode}`);
  next();
}

app.use(logger);

function checkPassword(req, res, next) {
  if (req.body["password"] === "ILoveProgramming") {
    password = true;
  } else {
    password = false;
  }
  next();
}
app.use(checkPassword);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (password) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
