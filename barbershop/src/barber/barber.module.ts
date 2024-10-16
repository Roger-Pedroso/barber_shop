import { Module } from '@nestjs/common';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BarberController],
  providers: [BarberService, PrismaService],
})
export class BarberModule {}
