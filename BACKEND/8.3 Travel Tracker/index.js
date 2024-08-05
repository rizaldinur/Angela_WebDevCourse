import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// set up db connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "surabaya12",
  port: 5432,
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //fetch data from db
  let data = await db.query("SELECT * from visited_countries");

  let countries = [];
  data.rows.forEach((element) => {
    countries.push(element.country_code);
  });
  res.render("index.ejs", {
    total: data.length,
    countries: countries,
  });
  console.log(countries);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
