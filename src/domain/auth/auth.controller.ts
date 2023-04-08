import {
  ApiController,
  BasicAuthGuard,
} from '../../common/decorators/index.js';
import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import {
  GoogleLoginResponseDto,
  LoginResponseDto,
  SignUpDto,
  SignupResponseDto,
} from './auth.zod.js';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard.js';

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginResponseDto,
  })
  @BasicAuthGuard()
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: any) {
    req.session.destroy();
    return 'ok';
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: SignupResponseDto,
  })
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Get('google/redirect')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  @ApiResponse({
    type: LoginResponseDto,
  })
  googleRedirect(@Req() req: any) {
    return this.authService.googleLogin(req);
  }

  @Get('google')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  @ApiResponse({
    type: GoogleLoginResponseDto,
  })
  googleLogin() {
    return 'ok';
  }

  @Post('refresh')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  refreshToken(@Req() req: any) {
    return this.authService.refresh(req.user.refreshToken, req.user.id);
  }
}
