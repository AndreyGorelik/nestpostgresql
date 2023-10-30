import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config/config';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseInterface } from './user.types';
import { compare } from 'bcrypt';
import { UpdateCurrentUserDto } from './dto/updateCurrentUser.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    const userByName = await this.userRepository.findOne({
      where: {
        name: createUserDto.name,
      },
    });

    if (userByEmail || userByName) {
      throw new BadRequestException('email or name are already registered');
    }

    const user: User = new User();
    Object.assign(user, createUserDto);
    return await this.userRepository.save(user);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
      select: ['id', 'name', 'email', 'password'],
    });

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect Password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;

    return user;
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async viewUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async removeUser(id: number): Promise<{ affected?: number }> {
    return await this.userRepository.delete(id);
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateCurrentUser(
    userId: number,
    updateCurrentUserDto: UpdateCurrentUserDto,
  ): Promise<User> {
    const user = await this.findById(userId);
    Object.assign(user, updateCurrentUserDto);
    return await this.userRepository.save(user);
  }

  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
