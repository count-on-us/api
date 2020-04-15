import { IsNotEmpty, MaxLength, IsEmail } from "class-validator";

export class CreateParticipantDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
