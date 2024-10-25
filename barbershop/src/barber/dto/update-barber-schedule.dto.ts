import { PartialType } from '@nestjs/mapped-types';
import { CreateBarberDto } from './create-barber.dto';
import { isArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBarberScheduleDto {
  @IsNotEmpty()
  @IsString()
  schedule: any;
}
