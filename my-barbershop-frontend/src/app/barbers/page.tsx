"use client";

import { useEffect, useState } from "react";
import { Servico } from "../services/page";

export interface Barbeiro {
  id: number;
  name: string;
  specialization: string;
  services: Servico[];
}

export default function Barbeiros() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);

  useEffect(() => {
    async function fetchBarbeiros() {
      const res = await fetch("http://localhost:3001/barbers"); // URL do Strapi
      const data = await res.json();
      console.log("data", data);

      setBarbeiros(data);
    }
    fetchBarbeiros();
  }, []);

  return (
    <div>
      <h1>Barbeiros</h1>
      <ul>
        {barbeiros.map((barbeiro) => (
          <li key={barbeiro.id}>
            <h2>{barbeiro.name}</h2>
            <p>Especialidade: {barbeiro.specialization}</p>
            <h3>Serviços: </h3>
            {barbeiro.services.map((servico) => {
              return (
                <div key={servico.id}>
                  <p>
                    {servico.name} - R$ {servico.price} - {servico.duration}
                    &nbsp; minutos
                  </p>
                </div>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}
