// src/appointment/appointment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    appointmentDate: Date;
    barberId: number;
    clientName: string;
    clientFone: string;
    startTime: string;
    endTime: string;
    serviceIds: number[];
  }): Promise<Appointment> {
    const {
      appointmentDate,
      barberId,
      serviceIds,
      clientFone,
      clientName,
      endTime,
      startTime,
    } = data;
    const teste = new Date(appointmentDate).setHours(0, 0, 0, 0);

    return this.prisma.appointment.create({
      data: {
        appointmentDate: new Date(teste),
        startTime,
        endTime,
        clientFone,
        clientName,
        barber: { connect: { id: barberId } },
        services: {
          connect: serviceIds.map((id) => ({ id })), // Associando serviços
        },
      },
    });
  }

  async findAll(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      include: {
        barber: true, // Incluir barbeiro na consulta
        services: true, // Incluir serviços associados
      },
    });
  }

  async getAvailableSlots(
    barberId: number,
    date: string,
    serviceIds: number[],
  ) {
    function timeToMinutes(time: string) {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    }
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() + 1);

    const appointments = await this.prisma.appointment.findMany({
      where: {
        barberId,
        appointmentDate: day,
      },
      orderBy: { startTime: 'asc' },
    });

    const services = await this.prisma.service.findMany({
      where: { id: { in: serviceIds } },
    });
    const totalDuration = services.reduce(
      (acc, service) => acc + service.duration,
      0,
    );

    // Intervalos de pausa (exemplo: 12:00 - 13:30)
    const breakTimes = [
      { start: timeToMinutes('12:00'), end: timeToMinutes('13:30') },
    ];

    const startHour = 8 * 60; // 9:00 AM
    const endHour = 18 * 60; // 6:00 PM
    const bookedSlots = appointments.map((app) => ({
      start: timeToMinutes(app.startTime),
      end: timeToMinutes(app.endTime),
    }));

    const availableSlots = [];
    for (let time = startHour; time + totalDuration <= endHour; time += 5) {
      const isConflicting = bookedSlots.some(
        (slot) => time < slot.end && time + totalDuration > slot.start,
      );

      const isDuringBreak = breakTimes.some(
        (breakTime) =>
          time < breakTime.end && time + totalDuration > breakTime.start,
      );

      if (!isConflicting && !isDuringBreak) {
        availableSlots.push(time);
      }
    }

    return availableSlots.map((time) => {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const minutesParsed = minutes.toString().padStart(2, '0');
      return `${hours}:${minutesParsed}`;
    });
  }
}
