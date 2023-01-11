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
    <img src="https://img.shields.io/badge/Node-v18.12.1-2C8EBB?style=for-the-badge&logo=node.js&logoColor=green"/>
    <img src="https://img.shields.io/badge/Typescript-v4.9.4-2C8EBB?style=for-the-badge&logoColor=blue&logo=typescript"/>
    <img src="https://img.shields.io/badge/pnpm-v7.18.2-2C8EBB?style=for-the-badge&logo=pnpm&logoColor=blue"/>
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

```
src
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── app.zod.ts
├── cache
│   ├── cache.module.ts
│   └── cache.zod.ts
├── config
│   ├── config.zod.ts
│   ├── env
│   └── index.ts
├── constants
│   └── index.ts
├── database
│   ├── database.module.ts
│   ├── database.provider.ts
│   └── database.util.ts
├── domain
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.zod.ts
│   │   ├── basic-auth.strategy.ts
│   │   └── jwt-auth.strategy.ts
│   └── users
│       ├── user.entity.ts
│       ├── user.zod.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       ├── users.repository.ts
│       └── users.service.ts
├── infra
│   ├── filters
│   │   └── all-exception.filter.ts
│   ├── index.ts
│   ├── infra.zod.ts
│   ├── interceptors
│   │   └── response-transformer.interceptor.ts
│   ├── lifecycle
│   │   └── lifecycle.service.ts
│   └── middlewares
│       └── logger.middlewares.ts
├── main.ts
└── utils
    ├── decorators
    │   ├── cache.decorator.ts
    │   ├── index.ts
    │   ├── request-id.decorator.ts
    │   ├── swagger.decorator.ts
    │   └── user-id.decorator.ts
    ├── index.ts
    ├── init.util.ts
    └── sleep.util.ts

15 directories, 39 files
```