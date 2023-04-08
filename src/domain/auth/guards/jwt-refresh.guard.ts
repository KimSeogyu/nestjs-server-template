import { AuthGuard } from '@nestjs/passport';

export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {}
