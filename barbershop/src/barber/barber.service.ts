// src/barber/barber.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Barber } from '@prisma/client';

@Injectable()
export class BarberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    barberShopId: number;
    imageUrl: string;
    email: string;
    fone: string;
  }): Promise<Barber> {
    const { name, barberShopId, imageUrl, email, fone } = data;

    return this.prisma.barber.create({
      data: {
        name,
        imageUrl,
        email,
        fone,
        barberShop: { connect: { id: barberShopId } },
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
}
