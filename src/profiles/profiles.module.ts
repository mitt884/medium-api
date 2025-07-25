import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ProfilesRepository } from './profiles.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesRepository, PrismaService],
})
export class ProfilesModule {}
