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

async function getUserData() {
  try {
    const res = await db.query("SELECT * FROM users");
    users = res.rows;
    console.log(users);
  } catch (error) {
    console.error("Error fetching user data from database: ", err.stack);
  }
}

async function checkVisited(userID) {
  try {
    const result = await db.query(
      "SELECT countries.country_code, countries.country_name " +
        "FROM visited_countries " +
        "join users on users.id = visited_countries.user_id " +
        "join countries on countries.id = visited_countries.country_id " +
        "where users.id = $1",
      [userID]
    );
    console.log(result.rows);
    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    return countries;
  } catch (error) {
    console.error("Error fetching data from database.\n", error.stack);
    let countries = [];
    return countries;
  }
}

const render = {};
app.get("/", async (req, res) => {
  try {
    await getUserData();
    const found = users.find((user) => user.id === currentUserId);
    console.log(currentUserId);
    console.log(found.color);
    const countries = await checkVisited(currentUserId);

    render.total = countries.length;
    render.countries = countries;
    render.users = users;
    render.color = found.color;
    res.render("index.ejs", render);
  } catch (error) {
    console.error("Something went wrong.\n", error.stack);
    res.status(500).send("Something went horribly wrong.");
  }
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
      console.warn(err.stack);
      res.render("index.ejs", render);
    }
  } catch (err) {
    render.error = err.message;
    console.error("Error: ", err.stack);
    res.render("index.ejs", render);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add) return res.render("new.ejs");
  currentUserId = parseInt(req.body.user);
  res.redirect("/");
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  const newUser = [req.body.name, req.body.color];
  console.log(newUser);

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id",
      newUser
    );
    currentUserId = result.rows[0].id;
    res.redirect("/");
  } catch (err) {
    console.error(err.stack);
    res.render("new.ejs");
  }
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
