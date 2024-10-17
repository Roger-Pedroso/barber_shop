// src/barbershop/barbershop.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BarberShopService } from './barbershop.service';
import { BarberShop } from '@prisma/client';

@Controller('barbershop')
export class BarberShopController {
  constructor(private readonly barberShopService: BarberShopService) {}

  @Post()
  create(
    @Body()
    barberShopData: {
      name: string;
      fone: string;
      address: string;
      imageUrl: string;
    },
  ): Promise<BarberShop> {
    return this.barberShopService.create(barberShopData);
  }

  @Get()
  findAll(): Promise<BarberShop[]> {
    return this.barberShopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BarberShop> {
    return this.barberShopService.findOne(Number(id));
  }
}
