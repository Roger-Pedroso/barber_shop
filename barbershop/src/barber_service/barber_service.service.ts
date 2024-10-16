// src/service/service.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBarberServiceDto } from './dto/create-barber_service.dto';
import { Service } from '@prisma/client';

@Injectable()
export class BarberServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBarberServiceDto): Promise<Service> {
    const { name, price, duration, barberShopId } = data;

    return this.prisma.service.create({
      data: {
        name,
        price,
        duration,
        barberShop: { connect: { id: barberShopId } }, // Associando a barbearia
      },
    });
  }

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany({
      include: {
        barbers: true, // Incluir barbeiros associados
      },
    });
  }
}
