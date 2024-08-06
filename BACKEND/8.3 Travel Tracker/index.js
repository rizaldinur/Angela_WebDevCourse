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

const render = {};
async function getVisited() {
  let data = await db.query("SELECT * from visited_countries");

  let countries = [];
  data.rows.forEach((element) => {
    countries.push(element.country_code);
  });

  return countries;
}

app.get("/", async (req, res) => {
  //fetch data from db
  let countries = await getVisited();

  render.total = countries.length;
  render.countries = countries;
  res.render("index.ejs", render);
  console.log(countries);
});

app.post("/add", async (req, res) => {
  let country = req.body.country.trim().toLowerCase();

  // console.log(data.rows.length);
  try {
    //check if country exist
    //get the country code
    let data = await db.query(
      "SELECT country_code from countries WHERE LOWER(country_name) = $1",
      [country]
    );
    if (data.rows.length === 0) throw error;
    try {
      //check if already visited
      await db.query(
        "INSERT INTO visited_countries (country_code) values ($1)",
        [data.rows[0].country_code]
      );
      delete render.error;
      res.redirect("/");
    } catch (error) {
      //handle error if country already visited
      render.error = "Country already visited, add another";
      res.render("index.ejs", render);
    }
  } catch (error) {
    //handle error if country not exist in db
    render.error = "Country doesnt exist, try again";
    res.render("index.ejs", render);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
