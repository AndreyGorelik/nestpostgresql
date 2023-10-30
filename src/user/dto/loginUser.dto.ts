import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Please provide a valid email.' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  readonly password: string;
}
