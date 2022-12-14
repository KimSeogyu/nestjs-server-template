import { registerAs } from '@nestjs/config';

const DefaultConfig = registerAs('', async () => ({
  AUTH_USERNAME: process.env.AUTH_USERNAME ?? 'user',
  AUTH_PASSWORD: process.env.AUTH_PASSWORD ?? 'pass',
}));

export default DefaultConfig;
