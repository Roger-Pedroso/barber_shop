import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBarberDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  fone: string;

  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  barberShopId: number; // ID da barbearia associada
}
