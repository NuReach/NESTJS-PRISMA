import { IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;

  @IsString()
  @Length(6, 20) // Example: Minimum length 6, maximum length 20
  password: string;
}
