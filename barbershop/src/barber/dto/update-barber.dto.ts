import { PartialType } from '@nestjs/mapped-types';
import { CreateBarberDto } from './create-barber.dto';
import { isArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBarberDto extends PartialType(CreateBarberDto) {
  @IsString()
  name: string;

  @IsString()
  fone: string;

  @IsString()
  email: string;

  @IsNumber()
  barberShopId: number; // ID da barbearia associada

  @IsNumber({}, { each: true })
  services: number[];
}
