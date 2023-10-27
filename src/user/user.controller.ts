import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ExpressRequestInterface, UserResponseInterface } from './user.types';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('signin')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('userall')
  async findAll() {
    return await this.userService.findAllUser();
  }

  @Get('user')
  async currentUser(
    @Req() request: ExpressRequestInterface,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(request.user);
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.viewUser(+id);
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(+id, updateUserDto);
  }

  @Delete('user/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.removeUser(+id);
  }
}
