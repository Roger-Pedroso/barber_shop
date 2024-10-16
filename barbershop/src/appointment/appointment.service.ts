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
    clientId: number;
    serviceIds: number[];
  }): Promise<Appointment> {
    const { appointmentDate, barberId, clientId, serviceIds } = data;
    console.log(
      'data',
      data.serviceIds.map((id) => ({ id })),
    );

    return this.prisma.appointment.create({
      data: {
        appointmentDate,
        barber: { connect: { id: barberId } },
        client: { connect: { id: clientId } },
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
        client: true, // Incluir cliente na consulta
        services: true, // Incluir serviços associados
      },
    });
  }
}
