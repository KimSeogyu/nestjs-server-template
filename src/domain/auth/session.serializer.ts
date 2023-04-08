import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(
    payload: any,
    done: (err: Error | null, user: any) => void,
  ): any {
    done(null, payload);
  }
}
