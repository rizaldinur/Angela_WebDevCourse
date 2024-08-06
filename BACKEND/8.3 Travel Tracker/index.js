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
    total: data.rows.length,
    countries: countries,
  });
  console.log(countries);
});

app.post("/add", async (req, res) => {
  let country = req.body.country.trim().toLowerCase();
  country = country.charAt(0).toUpperCase() + country.slice(1);

  //get the country code
  let data = await db.query(
    "SELECT country_code from countries WHERE country_name= $1",
    [country]
  );
  console.log(data.rows[0]);

  if (data.rows.length !== 0) {
    //cek if already visited
    let visited = await db.query(
      "SELECT country_code from visited_countries WHERE country_code = $1",
      [data.rows[0].country_code]
    );

    
    if (visited.rows.length === 0) {
      await db.query(
        "INSERT INTO visited_countries (country_code) values ($1)",
        [data.rows[0].country_code]
      );
      return res.redirect("/");
    }
    return res.redirect("/");
  }

  //cek if already visited
  let visited = await db.query("SELECT country_code from visited_countries");
  let filtered = [];
  visited.rows.forEach((country) => {
    filtered.push(country.country_code);
  });
  if (filtered.includes(found.country_code)) return res.redirect("/");

  db.query("INSERT INTO visited_countries (country_code) values ($1)", [
    found.country_code,
  ]);

  res.redirect("/");
  console.log(filtered);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});