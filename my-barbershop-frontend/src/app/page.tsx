"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Barber } from "./admin/barbers/page";
import { Appointment, AppointmentStatus } from "./admin/appointments/page";
import { StepAttendant } from "@/components/clientAppointment/StepAttendant";
import { StepServices } from "@/components/clientAppointment/StepServices";
import { StepDate } from "@/components/clientAppointment/StepDate";
import { StepConfirmation } from "@/components/clientAppointment/StepConfirmation";
import { Service } from "./admin/services/page";

export interface Barbearia {
  id: number;
  name: string;
  address: string;
  fone: string;
  imageUrl: string;
}

export interface AvailableTimes {
  date: Date;
  availableTimes: string[];
  dayWeek: string;
}

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [barbeiros, setBarbeiros] = useState<Barber[]>([]);
  const [servicos, setServicos] = useState<Service[]>([]);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<Barber | null>(null);
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null);
  const [selectedServicos, setSelectedServicos] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientFone, setClientFone] = useState("");

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const saveAppointment = async () => {
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
        service_status: AppointmentStatus.Agendado,
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
    const fetchAppointments = async () => {
      const res = await fetch("http://localhost:3001/appointments");
      const data = await res.json();
      console.log("appointments", data);

      setAppointments(data);
    };

    async function fetchBarbeiros() {
      const res = await fetch("http://localhost:3001/barbers");
      const data = await res.json();
      console.log("data", data);

      setBarbeiros(data);
    }

    async function fetchBarbearia() {
      const res = await fetch("http://localhost:3001/barbershop/1");
      const data = await res.json();
      console.log("barbearia", data);

      setBarbearia(data);
    }
    fetchBarbeiros();
    fetchBarbearia();
    fetchAppointments();
  }, []);

  // Atualizar serviços disponíveis quando um barbeiro é selecionado
  useEffect(() => {
    if (selectedBarbeiro) {
      setServicos(selectedBarbeiro.services);
    }
  }, [selectedBarbeiro]);

  // Função principal para gerar horários disponíveis

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
      saveAppointment();
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
        <StepAttendant
          barbers={barbeiros}
          onNextStep={handleContinue}
          onSelectAttendant={setSelectedBarbeiro}
        />
      )}

      {step === 2 && (
        <StepServices
          services={servicos}
          onNextStep={handleContinue}
          onBackStep={handleBack}
          onSelectService={setSelectedServicos}
          selectedServices={selectedServicos}
        />
      )}

      {step === 3 && (
        <StepDate
          appointments={appointments}
          availableTimes={availableTimes}
          barberId={selectedBarbeiro?.id}
          selectedBarber={selectedBarbeiro}
          schedules={selectedBarbeiro?.schedule ?? []}
          setAvailableTimes={setAvailableTimes}
          setSelectedBarber={setSelectedBarbeiro}
          selectedTime={selectedHour}
          onSelectTime={setSelectedHour}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onBackStep={handleBack}
          onNextStep={handleContinue}
        />
      )}

      {step === 4 && (
        <StepConfirmation
          selectedHour={selectedHour}
          clientFone={clientFone}
          setClientFone={setClientFone}
          clientName={clientName}
          setClientName={setClientName}
          selectedDate={selectedDate}
          onNextStep={handleContinue}
          onBackStep={handleBack}
        />
      )}
    </div>
  );
}
