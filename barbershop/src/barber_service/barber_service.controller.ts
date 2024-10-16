// src/service/service.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { BarberServiceService } from './barber_service.service';
import { CreateBarberServiceDto } from './dto/create-barber_service.dto';
import { Service } from '@prisma/client';

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
}
