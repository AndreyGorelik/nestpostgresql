import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @IsNotEmpty({ message: 'Username cannot be empty.' })
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username allows only alphanumeric characters.',
  })
  username: string;

  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Please provide a valid Email.' })
  email: string;

  @IsInt({ message: 'Age must be an integer.' })
  age: number;

  @IsString()
  @IsEnum(['f', 'm'], { message: 'Gender must be either "f" or "m".' })
  gender: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
  })
  password: string;
}
