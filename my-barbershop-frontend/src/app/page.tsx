"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Barber } from "./admin/barbers/page";
import { Appointment } from "./admin/appointments/page";
import { StepAttendant } from "@/components/clientAppointment/StepAttendant";
import { StepServices } from "@/components/clientAppointment/StepServices";
import { StepDate } from "@/components/clientAppointment/StepDate";
import { StepConfirmation } from "@/components/clientAppointment/StepConfirmation";
import { Service } from "./admin/services/page";
import ConfirmationDialog from "@/components/clientAppointment/ConfirmationDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string>(
    "Seu agendamento foi salvo com sucesso!"
  );

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addMinutesToTime = (timeStr: string, minutesToAdd: number) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes + minutesToAdd);

    const newHours = String(date.getHours()).padStart(2, "0");
    const newMinutes = String(date.getMinutes()).padStart(2, "0");

    return `${newHours}:${newMinutes}`;
  };

  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const saveAppointment = async () => {
    try {
      const serviceTime = selectedServicos.reduce(
        (acc: number, service: Service) =>
          Number(acc) + Number(service.duration),
        0
      );
      const endTimeParsed = addMinutesToTime(selectedHour!, serviceTime);

      const data = {
        barberId: selectedBarbeiro?.id,
        serviceIds: selectedServicos.map((servico) => servico.id),
        appointmentDate: selectedDate,
        clientName,
        clientFone,
        startTime: selectedHour,
        endTime: endTimeParsed,
        // service_status: AppointmentStatus.Agendado,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result) {
        setConfirmationMessage(`Horário agendado para ${selectedDate?.toLocaleDateString(
          "pt-BR"
        )} as ${" "}
          ${selectedHour}`);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      const barber = selectedBarbeiro?.id;
      const date = selectedDate && formatDateLocal(selectedDate);
      const services = selectedServicos.map((service) => service.id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/available-slots?barberId=${barber}&date=${date}&serviceIds=[${services}]`
      );
      const data = await res.json();

      setAvailableTimes(data);
    };

    if (selectedBarbeiro && selectedDate && selectedServicos.length > 0) {
      fetchAvailableTimes();
    }
  }, [selectedBarbeiro, selectedDate, selectedServicos]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`
      );
      const data = await res.json();

      setAppointments(data);
    };

    async function fetchBarbeiros() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/barbers`);
      const data = await res.json();

      setBarbeiros(data);
    }

    async function fetchBarbearia() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/barbershop/1`
      );
      const data = await res.json();

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
          selectedServices={selectedServicos}
          schedules={selectedBarbeiro?.schedule ?? []}
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

      <ConfirmationDialog
        title="Confirmação"
        message={confirmationMessage}
        handleDialog={() => setIsDialogOpen((prev) => !prev)}
        isOpen={isDialogOpen}
        setStepOne={() => setStep(1)}
      />
    </div>
  );
}
