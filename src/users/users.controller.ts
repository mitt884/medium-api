import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCurrentUser(@Req() req) {
    return { user: await this.userService.getCurrentUser(req.user.id) };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateUser(@Req() req, @Body('user') updateUserDto: UpdateUserDto) {
    return { user: await this.userService.updateUser(req.user.id, updateUserDto) };
  }
}
