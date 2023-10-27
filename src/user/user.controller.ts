import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseInterface } from './user.types';
import { UserDecorator } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';

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
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.userService.findAllUser();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    // @Req() request: ExpressRequestInterface,
    @UserDecorator() user: User,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  // @Get('user')
  // async currentUser(
  //   @UserDecorator() user: User,
  // ): Promise<UserResponseInterface> {
  //   return this.userService.buildUserResponse(user);
  // }

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
