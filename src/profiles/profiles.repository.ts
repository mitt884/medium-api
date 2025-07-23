import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class ProfilesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(userId: number): Promise<User | null> {
      return this.prisma.User.findUnique({
        where: { id: userId },
      });
  }
}
