// src/barber/barber.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Barber } from '@prisma/client';

@Injectable()
export class BarberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; barberShopId: number }): Promise<Barber> {
    const { name, barberShopId } = data;

    return this.prisma.barber.create({
      data: {
        name,
        barberShop: { connect: { id: barberShopId } },
      },
    });
  }

  async findAll(): Promise<Barber[]> {
    return this.prisma.barber.findMany({
      include: {
        services: true, // Incluir serviços na consulta
      },
    });
  }
}
