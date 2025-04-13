import React, { useState } from "react";
import "./App.css";

function App() {
  const [pagina, setPagina] = useState("home");

  return (
    <div className="App">
      <h1>🎮 Nostalgia Games</h1>
      <div className="menu">
        <button onClick={() => setPagina("clientes")}>Clientes</button>
        <button onClick={() => setPagina("jogos")}>Jogos</button>
        <button onClick={() => setPagina("alugueis")}>Aluguéis</button>
        <button onClick={() => setPagina("devolucoes")}>Devoluções</button>
      </div>

      {pagina === "home" && <p>Bem-vindo à Nostalgia Games!</p>}
      {pagina === "clientes" && <Clientes />}
      {pagina === "jogos" && <Jogos />}
      {pagina === "alugueis" && <Alugueis />}
      {pagina === "devolucoes" && <Devolucoes />}
    </div>
  );
}

const clientesGlobais = [];
const jogosGlobais = [];
const alugueisGlobais = [];

function Clientes() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [clientes, setClientes] = useState(clientesGlobais);

  const cadastrar = () => {
    if (nome && telefone) {
      const novo = { id: clientes.length + 1, nome, telefone };
      clientesGlobais.push(novo);
      setClientes([...clientesGlobais]);
      setNome("");
      setTelefone("");
    }
  };

  return (
    <div>
      <h2>Cadastro de Clientes</h2>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <button onClick={cadastrar}>Cadastrar</button>
      <ul>
        {clientes.map((c) => (
          <li key={c.id}>
            #{c.id} - {c.nome} ({c.telefone})
          </li>
        ))}
      </ul>
    </div>
  );
}

function Jogos() {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [codigo, setCodigo] = useState("");
  const [jogos, setJogos] = useState(jogosGlobais);

  const cadastrar = () => {
    if (titulo && plataforma && codigo) {
      const novo = { id: jogos.length + 1, titulo, plataforma, codigo, alugado: false };
      jogosGlobais.push(novo);
      setJogos([...jogosGlobais]);
      setTitulo("");
      setPlataforma("");
      setCodigo("");
    }
  };

  return (
    <div>
      <h2>Cadastro de Jogos</h2>
      <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <input placeholder="Plataforma" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} />
      <input placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
      <button onClick={cadastrar}>Cadastrar</button>
      <ul>
        {jogos.map((j) => (
          <li key={j.id}>
            #{j.id} - {j.titulo} [{j.plataforma}] - Cod: {j.codigo} {j.alugado ? "(Alugado)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Alugueis() {
  const [clienteId, setClienteId] = useState("");
  const [jogoId, setJogoId] = useState("");
  const [alugueis, setAlugueis] = useState(alugueisGlobais);

  const alugar = () => {
    const cliente = clientesGlobais.find((c) => c.id === parseInt(clienteId));
    const jogo = jogosGlobais.find((j) => j.id === parseInt(jogoId));
    if (cliente && jogo && !jogo.alugado) {
      jogo.alugado = true;
      alugueisGlobais.push({ cliente, jogo, data: new Date().toLocaleDateString() });
      setAlugueis([...alugueisGlobais]);
      setClienteId("");
      setJogoId("");
    }
  };

  return (
    <div>
      <h2>Registro de Aluguéis</h2>
      <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
        <option value="">Selecione o cliente</option>
        {clientesGlobais.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>
      <select value={jogoId} onChange={(e) => setJogoId(e.target.value)}>
        <option value="">Selecione o jogo</option>
        {jogosGlobais.filter((j) => !j.alugado).map((j) => (
          <option key={j.id} value={j.id}>
            {j.titulo}
          </option>
        ))}
      </select>
      <button onClick={alugar}>Alugar</button>
      <ul>
        {alugueis.map((a, i) => (
          <li key={i}>
            {a.cliente.nome} alugou {a.jogo.titulo} em {a.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Devolucoes() {
  const [alugueis, setAlugueis] = useState(alugueisGlobais);

  const devolver = (index) => {
    alugueis[index].jogo.alugado = false;
    alugueisGlobais.splice(index, 1);
    setAlugueis([...alugueisGlobais]);
  };

  return (
    <div>
      <h2>Registro de Devoluções</h2>
      <ul>
        {alugueis.map((a, i) => (
          <li key={i}>
            {a.cliente.nome} devolveu {a.jogo.titulo}
            <button onClick={() => devolver(i)}>Devolver</button>
          </li>
        ))}
        {alugueis.length === 0 && <p>Nenhum jogo alugado no momento.</p>}
      </ul>
    </div>
  );
}

export default App;

