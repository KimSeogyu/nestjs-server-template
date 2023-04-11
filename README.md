<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Nestjs Server Template

<p align="center">
    <a href="https://github.com/SeogyuGim/nestjs-server-template/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/SeogyuGim/nestjs-server-template?style=for-the-badge"></a>
    <a href="https://github.com/SeogyuGim/nestjs-server-template/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/SeogyuGim/nestjs-server-template?style=for-the-badge"></a>
    <a href="https://github.com/SeogyuGim/nestjs-server-template/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/SeogyuGim/nestjs-server-template?style=for-the-badge"></a></br>
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FSeogyuGim%2Fnestjs-server-template&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true"/></a>
</p>

<p align='center'>
    <img src="https://img.shields.io/badge/Node-v18.15.0-2C8EBB?style=for-the-badge&logo=node.js&logoColor=green"/>
    <img src="https://img.shields.io/badge/Typescript-v4.9.4-2C8EBB?style=for-the-badge&logoColor=blue&logo=typescript"/>
    <img src="https://img.shields.io/badge/pnpm-v8.2.0-2C8EBB?style=for-the-badge&logo=pnpm&logoColor=blue"/>
    <img src="https://img.shields.io/badge/nestjs-v9.1.6-2C8EBB?style=for-the-badge&logoColor=red&logo=nestjs"/>
    <img src="https://img.shields.io/badge/mocha-v10.2.0-2C8EBB?style=for-the-badge&logoColor=red&logo=mocha"/>
    <img src="https://img.shields.io/badge/chai-v4.3.7-2C8EBB?style=for-the-badge&logoColor=red&logo=chai"/>
    <br />
</p>

## Project Configuration

- Edit files in `./src/config/env`

## How to test

- `~/<project-root>  $ pnpm test`

## Notice

- Using zod to validate data, including DTOs, Request & Response Data, ...etc

## Project structure

```bash
src
├── applications
│   └── api
│       ├── api.module.ts
│       ├── api.zod.ts
│       └── main.ts
├── common
│   ├── common.zod.ts
│   ├── constants.ts
│   ├── decorators
│   │   ├── cache.decorator.ts
│   │   ├── index.ts
│   │   ├── request-id.decorator.ts
│   │   ├── swagger.decorator.ts
│   │   └── user.decorator.ts
│   ├── filters
│   │   └── all-exception.filter.ts
│   ├── interceptors
│   │   └── response-transformer.interceptor.ts
│   ├── lifecycle
│   │   └── lifecycle.service.ts
│   └── middlewares
│       └── logger.middlewares.ts
├── config
│   ├── cache.config.ts
│   ├── config.zod.ts
│   ├── db.config.ts
│   ├── env
│   └── index.ts
├── domain
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.zod.ts
│   │   ├── basic-auth.strategy.ts
│   │   ├── google.strategy.ts
│   │   └── jwt-auth.strategy.ts
│   ├── health
│   │   ├── health.controller.ts
│   │   ├── health.module.ts
│   │   └── health.service.ts
│   ├── order
│   │   ├── order.controller.ts
│   │   ├── order.entity.ts
│   │   ├── order.module.ts
│   │   ├── order.repository.ts
│   │   ├── order.service.ts
│   │   └── order.zod.ts
│   └── users
│       ├── social-account.repository.ts
│       ├── user.entity.ts
│       ├── user.zod.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       ├── users.repository.ts
│       └── users.service.ts
├── infra
│   ├── cache
│   │   ├── cache.module.ts
│   │   └── cache.zod.ts
│   └── database
│       ├── database.module.ts
│       ├── database.provider.ts
│       └── database.util.ts
├── main.ts
└── utils
    ├── index.ts
    ├── init.utils.ts
    └── sleep.utils.ts

20 directories, 50 files
```
