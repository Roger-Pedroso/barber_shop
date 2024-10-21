"use client";

import { Servico } from "@/app/admin/services/page";
import { useEffect, useState } from "react";

export interface Barbeiro {
  id: number;
  name: string;
  imageUrl: string;
  services: Servico[];
}

export default function Barbeiros() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);

  useEffect(() => {
    async function fetchBarbeiros() {
      const res = await fetch("http://localhost:3001/barbers");
      const data = await res.json();

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
