import { useState } from "react";

function App() {

  const [tela, setTela] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [users, setUsers] = useState([]);

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
        setTela("bemvindo");
        carregarUsuarios();

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

        carregarUsuarios();

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

    if (!window.confirm("Deseja excluir este usuário?")) return;

    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });

    carregarUsuarios();

  }

  function sair() {

    setTela("login");
    setNomeUsuario("");

  }

  return (

    <div style={{
      background:"#f4f6fb",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      fontFamily:"Arial"
    }}>

      <div style={{
        background:"white",
        padding:"40px",
        borderRadius:"10px",
        width:"350px",
        boxShadow:"0 0 10px rgba(0,0,0,0.1)"
      }}>

        <h1 style={{textAlign:"center"}}>Controle Financeiro</h1>

        {tela === "login" && (

          <div>

            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            />

            <button onClick={login} style={{
              width:"100%",
              padding:"10px",
              background:"#4CAF50",
              color:"white",
              border:"none",
              cursor:"pointer"
            }}>
              Entrar
            </button>

            <br/><br/>

            <button onClick={()=>{
              setTela("cadastro");
              carregarUsuarios();
            }} style={{width:"100%",padding:"10px"}}>
              Criar conta
            </button>

          </div>

        )}

        {tela === "cadastro" && (

          <div>

            <h2>Cadastro</h2>

            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            />

            <button onClick={cadastrar} style={{
              width:"100%",
              padding:"10px",
              background:"#2196F3",
              color:"white",
              border:"none"
            }}>
              Cadastrar
            </button>

            <br/><br/>

            <h3>Usuários cadastrados</h3>

            {users.map((u)=>(
              <div key={u.id} style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"5px",
                borderBottom:"1px solid #ddd",
                padding:"5px"
              }}>
                <span>{u.name}</span>

                <button onClick={()=>excluirUsuario(u.id)} style={{
                  background:"red",
                  color:"white",
                  border:"none",
                  cursor:"pointer"
                }}>
                  Excluir
                </button>
              </div>
            ))}

            <br/>

            <button onClick={()=>setTela("login")} style={{width:"100%",padding:"10px"}}>
              Voltar para login
            </button>

          </div>

        )}

        {tela === "bemvindo" && (

          <div>

            <h2>Bem-vindo, {nomeUsuario}</h2>

            <button onClick={sair} style={{
              width:"100%",
              padding:"10px",
              background:"#f44336",
              color:"white",
              border:"none"
            }}>
              Sair
            </button>

            <br/><br/>

            <h3>Usuários cadastrados</h3>

            {users.map((u)=>(
              <div key={u.id} style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"5px",
                borderBottom:"1px solid #ddd",
                padding:"5px"
              }}>
                <span>{u.name}</span>

                <button onClick={()=>excluirUsuario(u.id)} style={{
                  background:"red",
                  color:"white",
                  border:"none"
                }}>
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