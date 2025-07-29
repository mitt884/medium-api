import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.usersRepository.createUser(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async getCurrentUser(userId: number) {
    return this.usersRepository.findById(userId);
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    let hashedPassword: string | undefined = undefined;
    if (dto.password) {
      hashedPassword = await bcrypt.hash(dto.password, 10);
    }

  return this.usersRepository.updateUser(userId, {
      email: dto.email || undefined,
      username: dto.username || undefined,
      password: hashedPassword || undefined,
      bio: dto.bio || undefined,
      image: dto.image || undefined,
    });
  }

}
