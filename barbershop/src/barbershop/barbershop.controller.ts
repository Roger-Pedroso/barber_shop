// src/barbershop/barbershop.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { BarberShopService } from './barbershop.service';
import { BarberShop } from '@prisma/client';

@Controller('barbershop')
export class BarberShopController {
  constructor(private readonly barberShopService: BarberShopService) {}

  @Post()
  create(@Body() barberShopData: { name: string }): Promise<BarberShop> {
    return this.barberShopService.create(barberShopData);
  }

  @Get()
  findAll(): Promise<BarberShop[]> {
    return this.barberShopService.findAll();
  }
}
