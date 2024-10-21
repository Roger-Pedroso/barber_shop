// src/app.module.ts
import { Module } from '@nestjs/common';
import { BarberShopModule } from './barbershop/barbershop.module';
import { PrismaService } from './prisma.service';
import { AppointmentModule } from './appointment/appointment.module';
import { BarberServiceModule } from './barber_service/barber_service.module';
import { BarberModule } from './barber/barber.module';

@Module({
  imports: [
    BarberShopModule,
    AppointmentModule,
    BarberServiceModule,
    BarberModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
