"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export enum AppointmentStatus {
  Agendado = "Agendado",
  Finalizado = "Finalizado",
  Cancelado = "Cancelado",
}

export interface Appointment {
  id: number;
  appointmentDate: Date;
  barberId: number;
  status: AppointmentStatus;
  clientFone: string;
  clientName: string;
}

export default function Agendamentos() {
  const fetchAppointments = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`);
    const data = await res.json();

    setAppointments(data);
  };

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl text-black font-bold">Agendamentos</h1>
      <div style={{ backgroundColor: "black" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((agendamento) => (
              <TableRow key={agendamento.id}>
                <TableCell>{agendamento.id}</TableCell>
                <TableCell>
                  {new Date(agendamento.appointmentDate).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </TableCell>
                <TableCell>{agendamento.clientName}</TableCell>
                <TableCell>{agendamento.clientFone}</TableCell>
                <TableCell>{agendamento.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
