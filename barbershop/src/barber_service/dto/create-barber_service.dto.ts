import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBarberServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number; // Duração em minutos

  @IsNotEmpty()
  barberShopId: number; // ID da barbearia associada
}
