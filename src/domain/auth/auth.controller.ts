import { ApiController } from '@app/utils/decorators';
import { Request, Post } from '@nestjs/common';
import { BasicAuthGuard } from '../../utils/decorators/swagger.decorator';
import { AuthService } from './auth.service';

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @BasicAuthGuard()
  login(@Request() req: any) {
    console.log('====================================');
    console.log(req.user);
    console.log('====================================');
    return this.authService.login(req.user);
  }
}
