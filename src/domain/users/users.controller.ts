import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiController } from '@app/utils/decorators';
import { JwtAuthGuard } from '@app/utils/decorators/swagger.decorator';
import {
  CreateUserDto,
  UpdateUsernameDto,
} from '@app/domain/users/zod/user.zod';

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
