import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async getProfile(userId: number, currentUserId?: number) {
    const profile = await this.profilesRepository.findById(userId);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const following = false;

    return {
      profile: {
        ...profile,
        following,
      },
    };
  }
}
