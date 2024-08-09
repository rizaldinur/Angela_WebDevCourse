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

let items = [];

async function getItemsData() {
  try {
    const res = await db.query("SELECT * FROM items ORDER BY id ASC");
    console.log(res.rows);
    return res.rows;
  } catch (error) {
    console.error("Error fetching items data from database.\n", error.stack);
    return [];
  }
}

app.get("/", async (req, res) => {
  items = await getItemsData();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  try {
    const item = req.body.newItem;
    if (item === "") {
      throw new Error("Title is empty.");
    }
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.warn(err.stack);
    res.redirect("/");
  }
});

app.post("/edit", async (req, res) => {
  try {
    const item = req.body.updatedItemTitle;
    const id = parseInt(req.body.updatedItemId);
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.warn(err.stack);
    res.redirect("/");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const id = parseInt(req.body.deleteItemId);
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (error) {
    console.warn(err.stack);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
