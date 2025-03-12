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
    console.log(
      'data',
      data.serviceIds.map((id) => ({ id })),
    );

    return this.prisma.appointment.create({
      data: {
        appointmentDate,
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
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await this.prisma.appointment.findMany({
      where: { barberId, appointmentDate: { gte: startOfDay, lte: endOfDay } },
      orderBy: { startTime: 'asc' },
    });

    const services = await this.prisma.service.findMany({
      where: { id: { in: serviceIds } },
    });
    const totalDuration = services.reduce(
      (acc, service) => acc + service.duration,
      0,
    );

    const startHour = 8 * 60; // 9:00 AM
    const endHour = 18 * 60; // 6:00 PM
    const bookedSlots = appointments.map((app) => ({
      start: timeToMinutes(app.startTime),
      end: timeToMinutes(app.endTime),
    }));

    const availableSlots = [];
    for (let time = startHour; time + totalDuration <= endHour; time += 5) {
      if (
        !bookedSlots.some(
          (slot) => time < slot.end && time + totalDuration > slot.start,
        )
      ) {
        availableSlots.push(time);
      }
    }

    return availableSlots.map(
      (time) => `${Math.floor(time / 60)}:${time % 60}`,
    );
  }
}
