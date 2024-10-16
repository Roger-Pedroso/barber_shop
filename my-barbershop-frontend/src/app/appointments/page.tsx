"use client";

import { useState, useEffect } from "react";
import { Barbeiro } from "../barbers/page";
import { Servico } from "../services/page";

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<Barbeiro | null>(
    null
  );
  const [selectedServicos, setSelectedServicos] = useState<Servico[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // cadastrar agendamento
  const handleAgendamento = async () => {
    try {
      const [horas, minutos] = selectedHour!.split(":");

      const data = {
        barberId: selectedBarbeiro?.id,
        serviceIds: selectedServicos.map((servico) => servico.id),
        appointmentDate: new Date(
          selectedDate!.setHours(Number(horas), Number(minutos), 0)
        ),
        clientId: 1,
        // service_status: "Agendado",
      };

      const res = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchBarbeiros() {
      const res = await fetch("http://localhost:3001/barbers");
      const data = await res.json();
      console.log("data", data);

      setBarbeiros(data);
    }
    fetchBarbeiros();
  }, []);

  // Atualizar serviços disponíveis quando um barbeiro é selecionado
  useEffect(() => {
    if (selectedBarbeiro) {
      setServicos(selectedBarbeiro.services);
    }
  }, [selectedBarbeiro]);

  // Gerar datas para a terceira etapa
  const getNext15Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Gerar horários disponíveis para a data selecionada
  const getAvailableTimes = () => {
    const times = [];
    const start = 8; // Horário de início (8h)
    const end = 18; // Horário de término (18h)
    for (let i = start; i < end; i++) {
      times.push(`${i}:00`);
      times.push(`${i}:30`);
    }
    setAvailableTimes(times);
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      // Aqui você pode processar o agendamento
      console.log({
        selectedBarbeiro,
        selectedServicos,
        selectedDate,
        clientName,
        clientPhone,
        selectedHour,
      });
      alert("Agendamento realizado com sucesso!");
      handleAgendamento();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 2) {
        setSelectedServicos([]);
        setStep(1);
      }

      if (step === 3) {
        setSelectedServicos([]);
        setSelectedDate(null);
        setSelectedHour(null);
        setStep(2);
      }

      if (step === 4) {
        setClientName("");
        setClientPhone("");
        setStep(3);
      }
      // setStep(step - 1);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h1>Selecione um Barbeiro</h1>
          <ul>
            {barbeiros.map((barbeiro) => (
              <li key={barbeiro.id}>
                <button
                  onClick={() => {
                    setSelectedBarbeiro(barbeiro);
                    handleContinue();
                  }}
                >
                  {barbeiro.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1>Selecione os Serviços</h1>
          <ul>
            {servicos.map((servico) => (
              <li key={servico.id}>
                <label>
                  <input
                    type="checkbox"
                    value={servico.id}
                    onChange={(e) => {
                      const newSelectedServicos = e.target.checked
                        ? [...selectedServicos, servico]
                        : selectedServicos.filter((s) => s.id !== servico.id);
                      setSelectedServicos(newSelectedServicos);
                    }}
                  />
                  {servico.name} - R${servico.price}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleBack}>Voltar</button>
          <button
            onClick={handleContinue}
            disabled={selectedServicos.length === 0}
          >
            Continuar
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1>Selecione a Data</h1>
          <div>
            {getNext15Days().map((date) => (
              <button
                key={date.toString()}
                onClick={() => {
                  setSelectedDate(date);
                  getAvailableTimes();
                }}
              >
                {date.toLocaleDateString()}
              </button>
            ))}
          </div>
          {availableTimes.length > 0 && (
            <div>
              <h2>Horários Disponíveis</h2>
              {availableTimes.map((time) => (
                <button key={time} onClick={() => setSelectedHour(time)}>
                  {selectedHour === time ? <b>{time}</b> : time}
                </button>
              ))}
            </div>
          )}
          <button onClick={handleBack}>Voltar</button>
          <button
            onClick={handleContinue}
            disabled={
              !selectedDate || availableTimes.length === 0 || !selectedHour
            }
          >
            Continuar
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h1>Dados do Cliente</h1>
          <div>
            <label>
              Nome:
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleBack}>Voltar</button>
          <button
            onClick={handleContinue}
            disabled={!clientName || !clientPhone}
          >
            Finalizar Agendamento
          </button>
        </div>
      )}
    </div>
  );
}
