import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';

export const ApiController = (name: string) =>
  applyDecorators(
    Controller(name.toLocaleLowerCase()),
    ApiTags(name.toUpperCase()),
  );

export const BasicAuthGuard = () =>
  applyDecorators(UseGuards(AuthGuard('basic')), ApiBasicAuth());
