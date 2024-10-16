import { Module } from '@nestjs/common';
import { BarberServiceService } from './barber_service.service';
import { BarberServiceController } from './barber_service.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BarberServiceController],
  providers: [BarberServiceService, PrismaService],
})
export class BarberServiceModule {}
