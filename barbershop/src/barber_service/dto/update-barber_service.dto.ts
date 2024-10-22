import { PartialType } from '@nestjs/mapped-types';
import { CreateBarberServiceDto } from './create-barber_service.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBarberServiceDto extends PartialType(
  CreateBarberServiceDto,
) {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  duration: number;

  @IsBoolean()
  active: boolean;
}
