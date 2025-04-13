import React, { useState, useEffect } from "react";
import "./TelaInicial.css";

export default function TelaInicial({ aoEntrar }) {
  const [texto, setTexto] = useState("");
  const [etapa, setEtapa] = useState(0);
  const linhas = [
    "🔓 Iniciando Nostalgia Games...",
    "█ Carregando sistema retrô...",
    "Pronto para viajar no tempo 🎮"
  ];

  useEffect(() => {
    if (etapa < linhas.length) {
      let i = 0;
      const escrever = () => {
        if (i <= linhas[etapa].length) {
          setTexto(linhas[etapa].slice(0, i));
          i++;
          setTimeout(escrever, 40);
        } else {
          setTimeout(() => setEtapa(etapa + 1), 800);
        }
      };
      escrever();
    }
  }, [etapa]);

  if (etapa >= linhas.length) {
    return (
      <div className="tela-inicial">
        <p>{linhas[2]}</p>
        <button onClick={aoEntrar}>ENTRAR</button>
      </div>
    );
  }

  return (
    <div className="tela-inicial">
      <p>{texto}</p>
    </div>
  );
}

