import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.User.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.User.findUnique({
      where: { email },
    });
  }

  async findById(userId: number): Promise<User | null> {
    return this.prisma.User.findUnique({
      where: { id: userId },
    });
}


  async updateUser(userId: number,data: Prisma.UserUpdateInput,): Promise<Partial<User>> {
    return this.prisma.User.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        image: true,
      },
    });
}

}
