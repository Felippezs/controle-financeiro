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



app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {

      res.json({
        message: "Login realizado com sucesso",
        user: result.rows[0]
      });

    } else {

      res.status(401).json({
        message: "Email ou senha inválidos"
      });

    }

  } catch (err) {

    console.error(err.message);

  }

});

app.delete("/users/:id", async (req, res) => {

  const { id } = req.params;

  try {

    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    res.json({message:"Usuário deletado"});

  } catch (err) {

    console.error(err.message);

  }

});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});