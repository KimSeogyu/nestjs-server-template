import { ApiController, BasicAuthGuard } from '@app/utils/decorators';
import { Body, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse, SignUpDto, SignupResponse } from './zod/auth.zod';
import { ApiResponse } from '@nestjs/swagger';

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginResponse,
  })
  @BasicAuthGuard()
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: SignupResponse,
  })
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }
}
