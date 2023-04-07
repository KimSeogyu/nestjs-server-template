import * as process from 'process';

const APP = process.env.APP || 'api';

const { bootstrap } = await import(`./applications/${APP}/main.js`);

bootstrap();
