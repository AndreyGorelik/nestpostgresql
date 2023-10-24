import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  surname: string;

  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  email: string;

  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  password: string;

  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  pet: string;
}
