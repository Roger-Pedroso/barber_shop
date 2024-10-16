"use client";

import { useEffect, useState } from "react";

export interface Servico {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    async function fetchServicos() {
      const res = await fetch("http://localhost:3001/barber-service");
      const data = await res.json();
      console.log("data", data);

      setServicos(data.data);
    }
    fetchServicos();
  }, []);

  return (
    <div>
      <h1>Serviços</h1>
      <ul>
        {servicos.map((servico) => (
          <li key={servico.id}>
            <h2>{servico.name}</h2>
            <p>Descrição: {servico.description}</p>
            <p>Preço: R${servico.price}</p>
            <p>Duração: {servico.duration} minutos</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
