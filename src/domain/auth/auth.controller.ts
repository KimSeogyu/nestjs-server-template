import {
  ApiController,
  CurrentGoogleUserType,
  CurrentUser,
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
  LogoutResponseDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from './auth.zod.js';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard.js';
import { User } from '../users/user.entity.js';

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LogoutResponseDto,
  })
  logout(@Req() req: any) {
    req.session.destroy();
    return { success: true };
  }

  @Get('google/redirect')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  @ApiResponse({
    type: GoogleLoginResponseDto,
  })
  googleRedirect(@CurrentUser() user: CurrentGoogleUserType) {
    return this.authService.googleLogin(user);
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
  @ApiResponse({
    type: RefreshTokenResponseDto,
  })
  refreshToken(@CurrentUser() user: User, @Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken, user.username);
  }
}
