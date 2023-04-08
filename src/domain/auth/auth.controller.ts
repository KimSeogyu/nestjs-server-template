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
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginResponseDto,
  })
  @BasicAuthGuard()
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: SignupResponseDto,
  })
  async signUp(@Body() dto: SignUpDto) {
    return await this.authService.signup(dto);
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
}
