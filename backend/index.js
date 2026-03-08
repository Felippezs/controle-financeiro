const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando");
});

app.get("/users", async (req, res) => {
  const users = await pool.query("SELECT * FROM users");
  res.json(users.rows);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.get("/users", async (req, res) => {

  try {

    const users = await pool.query("SELECT * FROM users");

    res.json(users.rows);

  } catch (err) {

    console.error(err.message);

  }

});

app.post("/users", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, password]
    );

    res.json(newUser.rows[0]);

  } catch (err) {

    console.error(err.message);

  }

});