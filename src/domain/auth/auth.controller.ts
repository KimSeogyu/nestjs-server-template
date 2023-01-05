import { ApiController, BasicAuthGuard } from '@app/utils/decorators';
import { Body, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './zod/auth.zod';

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @BasicAuthGuard()
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }
}
