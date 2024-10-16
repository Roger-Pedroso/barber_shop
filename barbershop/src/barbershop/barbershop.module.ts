// src/barbershop/barbershop.module.ts
import { Module } from '@nestjs/common';
import { BarberShopService } from './barbershop.service';
import { BarberShopController } from './barbershop.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BarberShopController],
  providers: [BarberShopService, PrismaService],
})
export class BarberShopModule {}
