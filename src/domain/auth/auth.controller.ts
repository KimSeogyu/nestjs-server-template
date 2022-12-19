import { ApiController } from '@app/utils/decorators';
import { Request, Post, Body } from '@nestjs/common';
import { BasicAuthGuard } from '../../utils/decorators/swagger.decorator';
import { AuthService } from './auth.service';
import { SignUpDto } from './zod/auth.zod';

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @BasicAuthGuard()
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
