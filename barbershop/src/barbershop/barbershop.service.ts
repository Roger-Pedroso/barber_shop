// src/barbershop/barbershop.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BarberShop } from '@prisma/client';

@Injectable()
export class BarberShopService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string }): Promise<BarberShop> {
    return this.prisma.barberShop.create({ data });
  }

  async findAll(): Promise<BarberShop[]> {
    return this.prisma.barberShop.findMany();
  }
}
