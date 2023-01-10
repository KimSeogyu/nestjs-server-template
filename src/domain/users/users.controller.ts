import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ApiController, JwtAuthGuard } from '../../utils/decorators/index.js';
import { CreateUserDto, UpdateUsernameDto } from './zod/user.zod.js';

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

  @Patch(':id/username')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUsernameDto) {
    return this.usersService.updateUsername(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
