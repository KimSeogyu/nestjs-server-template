let _NODE_ENV: string;

switch (process.env.NODE_ENV?.toLowerCase()) {
  case 'local':
  case 'test':
    _NODE_ENV = 'local';
    break;
  case 'dev':
  case 'develop':
  case 'development':
    _NODE_ENV = 'dev';
    break;
  case 'prd':
  case 'prod':
  case 'production':
    _NODE_ENV = 'prod';
    break;
  default:
    _NODE_ENV = 'local';
}

export const NODE_ENV = _NODE_ENV;
