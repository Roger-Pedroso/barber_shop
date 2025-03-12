// src/appointment/appointment.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
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
      startTime: string;
      endTime: string;
      serviceIds: number[];
    },
  ): Promise<Appointment> {
    return this.appointmentService.create(appointmentData);
  }

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get('/available-slots')
  async getAvailableSlots(
    @Query('barberId') barberId: string,
    @Query('date') date: string,
    @Query('serviceIds') serviceIds: string,
  ): Promise<any> {
    const serviceIdsParsed = JSON.parse(serviceIds);

    return this.appointmentService.getAvailableSlots(
      Number(barberId),
      date,
      serviceIdsParsed,
    );
  }
}
