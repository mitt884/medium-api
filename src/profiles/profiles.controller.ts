import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':username')
  async getProfile(@Param('username') userId: number, @Req() req) {
    const currentUserId = req.user?.id;
    return this.profilesService.getProfile(currentUserId);
  }
}
