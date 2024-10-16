import { PartialType } from '@nestjs/mapped-types';
import { CreateBarberServiceDto } from './create-barber_service.dto';

export class UpdateBarberServiceDto extends PartialType(CreateBarberServiceDto) {}
