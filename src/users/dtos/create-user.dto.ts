import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  Matches,
  IsNumberString,
  MaxLength,
} from 'class-validator';
import { UserProfession } from '../user-profession.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'The user name.',
    maxLength: 100,
    example: 'John Doe',
  })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user email.',
    example: 'user@domain.com',
  })
  readonly email: string;

  @IsIn([
    UserProfession.Psychiatrist,
    UserProfession.Psychoanalyst,
    UserProfession.Psychologist,
  ])
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user profession.',
    example: 'Psicólogo',
    enum: UserProfession,
  })
  readonly profession: string;

  @Matches(/([\w]+|[\d]+)\/[A-Z][A-Z]/)
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'The user license number.',
    example: '123456/SP',
    maxLength: 100,
  })
  readonly licenseNumber: string;

  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({
    description: 'The user phone.',
    example: '11999999999',
    maxLength: 30,
  })
  readonly phone: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Password must be between 8 and 20 characters; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.',
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user password.',
    example: '123p@assWord',
  })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Recaptcha response token from Google reCAPTCHA.',
    example: '',
  })
  readonly responseToken: string;
}
