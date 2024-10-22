// src/service/service.controller.ts

import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { BarberServiceService } from './barber_service.service';
import { CreateBarberServiceDto } from './dto/create-barber_service.dto';
import { Service } from '@prisma/client';
import { UpdateBarberServiceDto } from './dto/update-barber_service.dto';

@Controller('barber-service')
export class BarberServiceController {
  constructor(private readonly serviceService: BarberServiceService) {}

  @Post()
  async create(
    @Body() createServiceDto: CreateBarberServiceDto,
  ): Promise<Service> {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateBarberServiceDto,
  ): Promise<Service> {
    return this.serviceService.update(Number(id), updateServiceDto);
  }
}
