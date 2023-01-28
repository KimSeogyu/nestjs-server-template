import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiController, JwtAuthGuard } from '../../decorators/index.js';

import {
  CreateUserDto,
  CreateUserResponseDto,
  DeleteUserResponseDto,
  FindOneUserDto,
  FindManyUserResponseDto,
  FindOneUserResponseDto,
  UpdatePasswordDto,
  UpdatePasswordResponseDto,
  UpdateUsernameDto,
  UpdateUsernameResponseDto,
} from './user.zod.js';
import { UsersService } from './users.service.js';

@ApiController('users')
@JwtAuthGuard()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: CreateUserResponseDto,
    status: HttpStatus.CREATED,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: FindManyUserResponseDto,
    status: HttpStatus.OK,
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: FindOneUserResponseDto,
    status: HttpStatus.OK,
  })
  async findOne(@Query() dto: FindOneUserDto) {
    return await this.usersService.findOneByUsername(dto.username);
  }

  @Patch(':id/password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UpdatePasswordResponseDto,
    status: HttpStatus.OK,
  })
  async updatePassword(
    @Param('id') id: number,
    @Body() passwordDto: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(+id, passwordDto);
  }

  @Patch(':id/username')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UpdateUsernameResponseDto,
    status: HttpStatus.OK,
  })
  async updateUsername(
    @Param('id') id: number,
    @Body() usernameDto: UpdateUsernameDto,
  ) {
    return await this.usersService.updateUsername(+id, usernameDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: DeleteUserResponseDto,
    status: HttpStatus.OK,
  })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
