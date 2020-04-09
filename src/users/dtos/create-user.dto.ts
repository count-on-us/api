import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  Matches,
  IsNumberString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsIn(['Psicólogo', 'Psicanalista', 'Psiquiatra'])
  @IsNotEmpty()
  readonly profession: string;

  @Matches(/([\w]+|[\d]+)\/[A-Z][A-Z]/)
  @IsNotEmpty()
  @MaxLength(100)
  readonly licenseNumber: string;

  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly phone: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Password must be between 8 and 20 characters; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.',
  })
  @IsNotEmpty()
  readonly password: string;
}
