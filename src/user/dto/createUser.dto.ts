import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { NoRussianLettersValidator } from '../validators/noCyrillic.validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Please provide a valid Email.' })
  @Validate(NoRussianLettersValidator, {
    message: 'Russian letters are not allowed in the email.',
  })
  email: string;

  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @Validate(NoRussianLettersValidator, {
    message: 'Russian letters are not allowed in the email.',
  })
  password: string;
}
