import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "surabaya12",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

try {
  const res = await db.query("SELECT * FROM users");
  users = res.rows;
  console.log(users);
} catch (error) {
  console.error("Error fetching data from database: ", err.stack);
}

async function checkVisited(userID) {
  try {
    const result = await db.query(
      "SELECT countries.country_code " +
        "FROM visited_countries " +
        "join users on users.id = visited_countries.user_id " +
        "join countries on countries.id = visited_countries.country_id " +
        "where users.id = $1",
      [userID]
    );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
  } catch (error) {
    console.error("Error fetching data from database: ", error.stack);
  }
}

const render = {};
app.get("/", async (req, res) => {
  const countries = await checkVisited(currentUserId);

  render.total = countries.length;
  render.countries = countries;
  render.users = users;
  const found = users.find((user) => user.id === currentUserId);
  render.color = found.color;
  res.render("index.ejs", render);
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT id FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) throw new Error("Invalid country name.");
    const data = result.rows[0];
    const countryCode = data.id;
    try {
      await db.query(
        "INSERT INTO visited_countries (user_id, country_id) VALUES ($1, $2)",
        [currentUserId, countryCode]
      );
      delete render.error;
      res.redirect("/");
    } catch (err) {
      err.message = "Country already visited, add another.";
      render.error = err.message;
      console.warn("Error: ", err.stack);
      res.render("index.ejs", render);
    }
  } catch (err) {
    render.error = err.message;
    console.error("Error: ", err.stack);
    res.render("index.ejs", render);
  }
});

app.post("/user", async (req, res) => {
  currentUserId = parseInt(req.body.user);
  console.log(currentUserId);
  const countries = await checkVisited(currentUserId);

  const found = users.find((user) => user.id === currentUserId);
  console.log(found.color);
  render.total = countries.length;
  render.countries = countries;
  render.users = users;
  render.color = found.color;
  res.render("index.ejs", render);
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
