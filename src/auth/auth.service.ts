import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, password: string) {
    const user = await this.userService.findOne(name);
    if (!user) {
      throw new UnauthorizedException('Invalid User');
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, name: user.name };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token, name: user.name, id: user.id };
  }
  async getUserByName(name: string) {
    const user = await this.userService.findOne(name);
    if (!user) {
      throw new BadRequestException('Invalid User');
    }

    const payload = { sub: user.id, name: user.name };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token, name: user.name, id: user.id };
  }
}
