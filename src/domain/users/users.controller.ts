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
  FindOneUserByUsernameDto,
  FindManyUserResponseDto,
  FindOneyUsernameResponseDto,
  UpdatePasswordDto,
  UpdatePasswordResponseDto,
  UpdateUsernameDto,
  UpdateUsernameResponseDto,
  QueryByUserIdDto,
  FindManyUsersDto,
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
  async findAll(@Query() dto: FindManyUsersDto) {
    return await this.usersService.findAll(dto);
  }

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: FindOneyUsernameResponseDto,
    status: HttpStatus.OK,
  })
  async findOne(@Query() dto: FindOneUserByUsernameDto) {
    return await this.usersService.findOneByUsername(dto.username);
  }

  @Patch(':id/password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UpdatePasswordResponseDto,
    status: HttpStatus.OK,
  })
  async updatePassword(
    @Param() dto: QueryByUserIdDto,
    @Body() passwordDto: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(dto.id, passwordDto);
  }

  @Patch(':id/username')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UpdateUsernameResponseDto,
    status: HttpStatus.OK,
  })
  async updateUsername(
    @Param() dto: QueryByUserIdDto,
    @Body() usernameDto: UpdateUsernameDto,
  ) {
    return await this.usersService.updateUsername(dto.id, usernameDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: DeleteUserResponseDto,
    status: HttpStatus.OK,
  })
  async remove(@Param() dto: QueryByUserIdDto) {
    return await this.usersService.remove(dto.id);
  }
}
