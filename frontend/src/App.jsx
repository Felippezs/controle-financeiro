import { useState, useEffect } from "react";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const carregarUsuarios = async () => {

    const resposta = await fetch("http://localhost:3000/users");
    const dados = await resposta.json();

    setUsers(dados);

  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const cadastrar = async () => {

    await fetch("http://localhost:3000/users", {
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

    alert("Usuário cadastrado!");

    carregarUsuarios();

  };

  return (

    <div style={{ padding: 40 }}>

      <h1>Cadastro de Usuário</h1>

      <input
        placeholder="Nome"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Senha"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={cadastrar}>
        Cadastrar
      </button>

      <h2>Usuários cadastrados</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

    </div>

  );

}

export default App;