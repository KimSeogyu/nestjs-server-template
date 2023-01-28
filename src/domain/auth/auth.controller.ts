import { ApiController, BasicAuthGuard } from '../../decorators/index.js';
import { Body, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginResponseDto, SignUpDto, SignupResponseDto } from './auth.zod.js';
import { ApiResponse } from '@nestjs/swagger';

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginResponseDto,
  })
  @BasicAuthGuard()
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: SignupResponseDto,
  })
  async signUp(@Body() dto: SignUpDto) {
    return await this.authService.signup(dto);
  }
}
