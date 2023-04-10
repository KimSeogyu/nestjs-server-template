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
import {
  ApiController,
  ApiJwtAuthGuard,
  UserId,
} from '../../common/decorators/index.js';

import {
  CreateUserDto,
  CreateUserResponseDto,
  DeleteUserResponseDto,
  FindManyUserResponseDto,
  FindManyUsersDto,
  FindOneByIdResponseDto,
  FindOneByUsernameResponseDto,
  FindOneUserByUsernameDto,
  QueryByUserIdDto,
  UpdatePasswordDto,
  UpdatePasswordResponseDto,
  UpdateUsernameDto,
  UpdateUsernameResponseDto,
} from './user.zod.js';
import { UsersService } from './users.service.js';

@ApiController('users')
@ApiJwtAuthGuard()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: CreateUserResponseDto,
    status: HttpStatus.CREATED,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.save(createUserDto);
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

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: FindOneByIdResponseDto,
    status: HttpStatus.OK,
  })
  async me(@UserId() userId: number) {
    return this.usersService.findOne({ id: userId });
  }
}
