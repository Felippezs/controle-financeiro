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
    const users = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erro ao listar usuários" });
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
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
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
        user: result.rows[0],
      });
    } else {
      res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erro no login" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "Usuário deletado" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
});

app.get("/transactions/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY id ASC",
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erro ao listar transações" });
  }
});

app.post("/transactions", async (req, res) => {
  const { description, amount, type, user_id } = req.body;

  try {
    if (!user_id) {
      return res.status(400).json({
        message: "user_id não informado",
      });
    }

    const tipoLimpo = type.trim().toLowerCase();

    const nova = await pool.query(
      "INSERT INTO transactions (user_id, description, amount, type) VALUES ($1,$2,$3,$4) RETURNING *",
      [user_id, description, amount, tipoLimpo]
    );

    res.json(nova.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao salvar transação",
    });
  }
});

app.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { description, amount, type } = req.body;

  try {
    const result = await pool.query(
      `UPDATE transactions
       SET description = $1,
           amount = $2,
           type = $3
       WHERE id = $4
       RETURNING *`,
      [description, amount, type, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao atualizar transação",
    });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM transactions WHERE id = $1",
      [id]
    );

    res.json({
      message: "Transação deletada",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao deletar transação",
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});