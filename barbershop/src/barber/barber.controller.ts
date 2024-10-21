// src/barber/barber.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { BarberService } from './barber.service';
import { Barber } from '@prisma/client';

@Controller('barbers')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  async create(
    @Body()
    barberData: {
      name: string;
      barberShopId: number;
      imageUrl: string;
      email: string;
      fone: string;
    },
  ): Promise<Barber> {
    return this.barberService.create(barberData);
  }

  @Get()
  async findAll(): Promise<Barber[]> {
    return this.barberService.findAll();
  }
}
