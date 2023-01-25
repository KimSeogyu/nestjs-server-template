import {
  Body,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ApiController, JwtAuthGuard } from '../../decorators/index.js';
import {
  CreateUserDto,
  DeleteUserResponseDto,
  UpdatePasswordDto,
  UpdatePasswordResponseDto,
  UpdateUsernameDto,
  UpdateUsernameResponseDto,
} from './user.zod.js';
import { ApiResponse } from '@nestjs/swagger';

@ApiController('users')
@JwtAuthGuard()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Patch(':id/password')
  @ApiResponse({
    type: UpdatePasswordResponseDto,
    status: HttpStatus.OK,
  })
  updatePassword(
    @Param('id') id: number,
    @Body() passwordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(+id, passwordDto);
  }

  @Patch(':id/username')
  @ApiResponse({
    type: UpdateUsernameResponseDto,
    status: HttpStatus.OK,
  })
  updateUsername(
    @Param('id') id: number,
    @Body() usernameDto: UpdateUsernameDto,
  ) {
    return this.usersService.updateUsername(+id, usernameDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: DeleteUserResponseDto,
    status: HttpStatus.OK,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
