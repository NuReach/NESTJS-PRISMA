import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async signIn(loginDto: CreateAuthDto) {
    const { username, password } = loginDto;
    const user = await this.databaseService.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      new NotFoundException('User is not found!');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException('Invalid credentials!');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
