// src/barber/barber.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Barber } from '@prisma/client';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { UpdateBarberScheduleDto } from './dto/update-barber-schedule.dto';

@Injectable()
export class BarberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    barberShopId: number;
    imageUrl: string;
    email: string;
    fone: string;
    services: number[];
  }): Promise<Barber> {
    const { name, barberShopId, imageUrl, email, fone, services } = data;

    return this.prisma.barber.create({
      data: {
        name,
        imageUrl,
        email,
        fone,
        barberShop: { connect: { id: barberShopId } },
        services: { connect: services.map((id: number) => ({ id })) },
      },
    });
  }

  async findAll(): Promise<Barber[]> {
    return this.prisma.barber.findMany({
      include: {
        services: {
          where: {
            active: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateBarberDto): Promise<Barber> {
    const currentBarber = await this.prisma.barber.findUnique({
      where: { id },
      include: { services: true }, // Inclui os serviços atuais
    });

    const currentServiceIds = currentBarber.services.map(
      (service) => service.id,
    );

    // Serviços a serem desconectados (não estão mais na lista)
    const servicesToDisconnect = currentServiceIds.filter(
      (id) => !data.services.includes(id),
    );

    // Serviços a serem conectados (novos na lista)
    const servicesToConnect = data.services.filter(
      (id) => !currentServiceIds.includes(id),
    );

    return this.prisma.barber.update({
      where: { id },
      data: {
        services: {
          disconnect: servicesToDisconnect.map((id) => ({ id })),
          connect: servicesToConnect.map((id) => ({ id })),
        },
      },
    });
  }

  async updateSchedule(
    id: number,
    data: UpdateBarberScheduleDto,
  ): Promise<Barber> {
    return this.prisma.barber.update({
      where: { id },
      data,
    });
  }
}
