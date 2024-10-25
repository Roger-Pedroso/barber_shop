// src/barber/barber.controller.ts
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { BarberService } from './barber.service';
import { Barber } from '@prisma/client';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { UpdateBarberScheduleDto } from './dto/update-barber-schedule.dto';

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
      services: number[];
    },
  ): Promise<Barber> {
    return this.barberService.create(barberData);
  }

  @Get()
  async findAll(): Promise<Barber[]> {
    return this.barberService.findAll();
  }

  @Put(':id')
  async update(
    @Body()
    barberData: UpdateBarberDto,
    @Param('id') id: string,
  ): Promise<Barber> {
    return this.barberService.update(Number(id), barberData);
  }

  @Put(':id/schedule')
  async updateSchedule(
    @Body()
    barberData: UpdateBarberScheduleDto,
    @Param('id') id: string,
  ): Promise<Barber> {
    return this.barberService.updateSchedule(Number(id), barberData);
  }
}
