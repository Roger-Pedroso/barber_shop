// src/client/client.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Client } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClientDto): Promise<Client> {
    const { name, phone } = data;

    return this.prisma.client.create({
      data: {
        name,
        phone,
      },
    });
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany({
      include: {
        appointments: true, // Incluir agendamentos associados
      },
    });
  }
}
