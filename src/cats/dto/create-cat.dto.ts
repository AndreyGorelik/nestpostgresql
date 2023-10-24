import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(2, { message: 'Cat nickname must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Cat nickname cannot be empty.' })
  nickname: string;
}
