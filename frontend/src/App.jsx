import { useState } from "react";

function App() {
  const [tela, setTela] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("receita");
  const [transacoes, setTransacoes] = useState([]);

  async function login() {
    try {
      const resposta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setNomeUsuario(dados.user.name);
        setUserId(dados.user.id);
        setTela("bemvindo");
        carregarTransacoes(dados.user.id);
      } else {
        alert(dados.message);
      }
    } catch (erro) {
      alert("Erro ao conectar com o servidor");
    }
  }

  async function cadastrar() {
    try {
      const resposta = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (resposta.ok) {
        alert("Usuário cadastrado com sucesso");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert("Erro ao cadastrar usuário");
      }
    } catch (erro) {
      alert("Erro ao conectar com o servidor");
    }
  }

  async function carregarUsuarios() {
    const resposta = await fetch("http://localhost:3000/users");
    const dados = await resposta.json();
    setUsers(dados);
  }

  async function excluirUsuario(id) {
    if (!window.confirm("Deseja excluir?")) return;

    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });

    carregarUsuarios();
  }

  async function adicionarTransacao() {
    if (!userId) {
      alert("Faça login novamente.");
      return;
    }

    if (!descricao || !valor) {
      alert("Preencha descrição e valor.");
      return;
    }

    const resposta = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: descricao,
        amount: valor,
        type: tipo,
        user_id: userId,
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.message || "Erro ao registrar transação");
      return;
    }

    setDescricao("");
    setValor("");
    setTipo("receita");

    carregarTransacoes(userId);
  }

  async function carregarTransacoes(id) {
    const resposta = await fetch(`http://localhost:3000/transactions/${id}`);
    const dados = await resposta.json();
    setTransacoes(dados);
  }

  async function deletarTransacao(id) {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
    });

    carregarTransacoes(userId);
  }

  function sair() {
    setTela("login");
    setNomeUsuario("");
    setUserId(null);
    setTransacoes([]);
  }

  const receitas = transacoes.filter(
    (t) => String(t.type).trim().toLowerCase() === "receita"
  );

  const despesas = transacoes.filter(
    (t) => String(t.type).trim().toLowerCase() === "despesa"
  );

  const totalReceitas = receitas.reduce(
    (acc, t) => acc + Number(t.amount),
    0
  );

  const totalDespesas = despesas.reduce(
    (acc, t) => acc + Number(t.amount),
    0
  );

  const saldo = totalReceitas - totalDespesas;

  return (
    <div
      style={{
        background: "#f4f6fb",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Financeiro</h1>

        {tela === "login" && (
          <div>
            <h2>Conecte-se</h2>

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <button
              onClick={login}
              style={{
                width: "100%",
                padding: "10px",
                background: "#4CAF50",
                color: "white",
                border: "none",
              }}
            >
              Entrar
            </button>

            <br />
            <br />

            <button
              onClick={() => setTela("cadastro")}
              style={{ width: "100%", padding: "10px" }}
            >
              Criar conta
            </button>

            <br />
            <br />

            <h3>Usuários cadastrados</h3>

            <button
              onClick={carregarUsuarios}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              Carregar usuários
            </button>

            {users.map((u) => (
              <div
                key={u.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  padding: "5px",
                }}
              >
                <span>{u.name}</span>
                <button
                  onClick={() => excluirUsuario(u.id)}
                  style={{ background: "red", color: "white", border: "none" }}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}

        {tela === "cadastro" && (
          <div>
            <h2>Cadastro</h2>

            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <button
              onClick={cadastrar}
              style={{
                width: "100%",
                padding: "10px",
                background: "#2196F3",
                color: "white",
                border: "none",
              }}
            >
              Cadastrar
            </button>

            <br />
            <br />

            <button
              onClick={() => setTela("login")}
              style={{ width: "100%", padding: "10px" }}
            >
              Voltar
            </button>
          </div>
        )}

        {tela === "bemvindo" && (
          <div>
            <h2>Bem-vindo, {nomeUsuario}</h2>

            <button
              onClick={sair}
              style={{
                width: "100%",
                padding: "10px",
                background: "#f44336",
                color: "white",
                border: "none",
              }}
            >
              Sair
            </button>

            <br />
            <br />

            <h3>Saldo: R$ {saldo}</h3>

            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <input
              type="number"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            >
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>

            <button
              onClick={adicionarTransacao}
              style={{
                width: "100%",
                padding: "10px",
                background: "#4CAF50",
                color: "white",
                border: "none",
              }}
            >
              Registrar
            </button>

            <br />
            <br />

            <h3>Receitas</h3>
            {receitas.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  padding: "5px",
                }}
              >
                <span>{t.description} - R$ {t.amount}</span>
                <button
                  onClick={() => deletarTransacao(t.id)}
                  style={{ background: "red", color: "white", border: "none" }}
                >
                  Excluir
                </button>
              </div>
            ))}

            <h3>Despesas</h3>
            {despesas.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  padding: "5px",
                }}
              >
                <span>{t.description} - R$ {t.amount}</span>
                <button
                  onClick={() => deletarTransacao(t.id)}
                  style={{ background: "red", color: "white", border: "none" }}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;