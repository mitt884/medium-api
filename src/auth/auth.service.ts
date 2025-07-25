import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BCRYPT_SALT_ROUNDS } from '../common/constants/bycrypt.constant';
import { UserResponse } from './interfaces/auth-response.interace';
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserResponse> {
    const { email, username, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await this.usersService.create({
      email,
      username,
      password: hashedPassword,
    });

    return this.buildUserResponse(user);
  }

  async login(loginDto: LoginDto): Promise<UserResponse> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildUserResponse(user);
  }

  private buildUserResponse(user: User): UserResponse {
    const token = this.jwtService.sign({ email: user.email, sub: user.id });
    return {
      user: {
        email: user.email,
        token,
        username: user.username,
        bio: user.bio,
        image: user.image,
      },
    };
  }
}
