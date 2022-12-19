export const APP_NODE_ENV = (() => {
  switch (process.env.NODE_ENV) {
    case 'local':
    case 'test':
      return 'local';
    case 'dev':
    case 'develop':
    case 'development':
      return 'dev';
    case 'prd':
    case 'prod':
    case 'production':
      return 'prod';
    default:
      return 'local';
  }
})();
