// src/appointment/appointment.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from '@prisma/client';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(
    @Body()
    appointmentData: {
      appointmentDate: Date;
      barberId: number;
      clientName: string;
      clientFone: string;
      serviceIds: number[];
    },
  ): Promise<Appointment> {
    return this.appointmentService.create(appointmentData);
  }

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }
}
