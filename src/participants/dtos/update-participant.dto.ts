import { MaxLength, IsEmail } from "class-validator";

export class UpdateParticipantDto {
  @MaxLength(100)
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
