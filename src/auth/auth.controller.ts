import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { UserResponse } from './interfaces/auth-response.interace';

@Controller('api/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async register(@Body('user') registerDto: RegisterDto): Promise<UserResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body('user') loginDto: LoginDto): Promise<UserResponse> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@GetUser() user: User): Promise<User> {
    return user; 
  }
}
