"use client";

import { useState, useEffect } from "react";
import { Barbeiro } from "../admin/barbers/page";
import { Servico } from "../admin/services/page";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export interface Barbearia {
  id: number;
  name: string;
  address: string;
  fone: string;
  imageUrl: string;
}

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<Barbeiro | null>(
    null
  );
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null);
  const [selectedServicos, setSelectedServicos] = useState<Servico[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientFone, setClientFone] = useState("");

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
        clientName,
        clientFone,
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

    async function fetchBarbearia() {
      const res = await fetch("http://localhost:3001/barbershop/1");
      const data = await res.json();
      console.log("barbearia", barbearia);

      setBarbearia(data);
    }
    fetchBarbeiros();
    fetchBarbearia();
  }, []);

  // Atualizar serviços disponíveis quando um barbeiro é selecionado
  useEffect(() => {
    if (selectedBarbeiro) {
      setServicos(selectedBarbeiro.services);
    }
  }, [selectedBarbeiro]);

  // Gerar datas para a terceira etapa
  const getNext14Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 14; i++) {
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
        clientFone,
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
        setClientFone("");
        setStep(3);
      }
      // setStep(step - 1);
    }
  };

  const compararDatas = (data1: Date, data2: Date | null) => {
    if (!data2) {
      return false;
    }

    return (
      data1.getFullYear() === data2.getFullYear() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getDate() === data2.getDate()
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "90%",
        width: "100%",
      }}
    >
      {window.innerWidth > 1000 && (
        <div className="self-end m-3">
          <Link href="/admin">
            <Button>Entrar</Button>
          </Link>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
          paddingTop: "15px",
        }}
      >
        {barbearia && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            <Image
              src={barbearia?.imageUrl}
              alt={barbearia?.name}
              width={300}
              height={200}
              style={{ borderRadius: "10%" }}
            />
            <h2 className="text-3xl p-2">{barbearia?.name}</h2>
            <p>{barbearia?.address}</p>
            <p>{barbearia?.fone}</p>
          </div>
        )}
      </div>
      {step === 1 && (
        <Card
          style={{
            width: "90vw",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "8px",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            padding: "15px",
            textAlign: "center",
          }}
        >
          <div>
            <h2 className="text-center text-2xl pb-4">
              Selecione um Atendente
            </h2>

            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {barbeiros.map((barbeiro) => (
                <div
                  key={barbeiro.id}
                  onClick={() => {
                    setSelectedBarbeiro(barbeiro);
                    handleContinue();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Image
                    src={barbeiro.imageUrl}
                    alt={barbeiro.name}
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "20%",
                      maxWidth: "100px",
                      maxHeight: "100px",
                      minHeight: "100px",
                      minWidth: "100px",
                    }}
                  />
                  <h3>{barbeiro.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card
          style={{
            width: "90vw",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "8px",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            padding: "15px",
          }}
        >
          <div>
            <h2 className="text-center text-2xl pb-4">Selecione os Serviços</h2>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {servicos.map((servico) => (
                <div
                  key={servico.id}
                  style={{
                    display: "flex",
                    alignSelf: "start",
                    fontSize: "20px",
                  }}
                >
                  <label>
                    <input
                      style={{ width: "18px", height: "18px" }}
                      type="checkbox"
                      value={servico.id}
                      onChange={(e) => {
                        const newSelectedServicos = e.target.checked
                          ? [...selectedServicos, servico]
                          : selectedServicos.filter((s) => s.id !== servico.id);
                        setSelectedServicos(newSelectedServicos);
                      }}
                    />
                    {servico.name} - R$&nbsp;{servico.price} &nbsp;(
                    {servico.duration}
                    min)
                  </label>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  alignSelf: "end",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <div>
                  <Button variant={"secondary"} onClick={handleBack}>
                    Voltar
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleContinue}
                    disabled={selectedServicos.length === 0}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card
          style={{
            width: "90vw",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "8px",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            padding: "15px",
          }}
        >
          <div>
            <h2 className="text-center text-2xl pb-4">Selecione a Data</h2>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="grid grid-cols-3 gap-1">
                {getNext14Days().map((date) => (
                  <Button
                    key={date.toString()}
                    style={{
                      backgroundColor: compararDatas(date, selectedDate)
                        ? "white"
                        : "gray",
                    }}
                    onClick={() => {
                      setSelectedHour(null);
                      setSelectedDate(date);
                      getAvailableTimes();
                    }}
                  >
                    {date.toLocaleDateString()}
                  </Button>
                ))}
              </div>
              <h2 className="text-center text-2xl pb-4">
                Horários Disponíveis
              </h2>

              {availableTimes.length > 0 && (
                <div className="grid grid-cols-5 gap-1">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      style={{
                        backgroundColor:
                          time === selectedHour ? "white" : "gray",
                      }}
                      onClick={() => setSelectedHour(time)}
                    >
                      {selectedHour === time ? <b>{time}</b> : time}
                    </Button>
                  ))}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignSelf: "end",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <div>
                  <Button variant={"secondary"} onClick={handleBack}>
                    Voltar
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleContinue}
                    disabled={selectedServicos.length === 0}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card
          style={{
            width: "90vw",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "8px",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            padding: "15px",
          }}
        >
          <div>
            <h2 className="text-center text-2xl pb-4">
              Confirme o Agendamento
            </h2>
            <p className="text-center pb-4">
              Confirmação do agendamento para a data:{" "}
              {selectedDate?.toLocaleDateString("pt-BR")} as {selectedHour}
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="flex self-start w-full">
                <Input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Nome"
                />
              </div>
              <div className="flex self-start w-full">
                <Input
                  type="text"
                  value={clientFone}
                  onChange={(e) => setClientFone(e.target.value)}
                  placeholder="Telefone"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignSelf: "end",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <div>
                  <Button variant={"secondary"} onClick={handleBack}>
                    Voltar
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleContinue}
                    disabled={selectedServicos.length === 0}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
