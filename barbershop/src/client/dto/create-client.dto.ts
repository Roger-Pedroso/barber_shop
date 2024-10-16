// src/client/dto/create-client.dto.ts

import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber(null) // Pode validar com um padrão específico, se necessário
  phone: string;
}
