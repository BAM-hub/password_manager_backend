import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { name: string; password: string }) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('userByName')
  getuserByName(@Query() query: { name: string }) {
    return this.authService.getUserByName(query.name);
  }
}
