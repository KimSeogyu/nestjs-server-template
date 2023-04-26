import * as process from 'process';
import { z } from 'zod';

const validateApp = z.enum(['api', 'cli']).safeParse(process.env.APP);
if (!validateApp.success) {
  console.error(
    `process.env.APP should be one of api or cli. You gave ${process.env.APP}`,
  );
} else {
  const app = validateApp.data;
  const { bootstrap } = await import(`./applications/${app}/main.js`);

  bootstrap();
}
