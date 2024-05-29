import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const date = new Date();
const day = date.getDay();
var dayType = "";
var advice = "";

app.use(bodyParser.urlencoded({ extended: true }));

function getDayType(req, res, next) {
  if (day < 5) {
    dayType = "a weekday";
    advice = "Let's work hard.";
  } else {
    dayType = "a weekend";
    advice = "Let's rest our mind and body.";
  }
  next();
}

app.use(getDayType);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    dayType: dayType,
    advice: advice,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
