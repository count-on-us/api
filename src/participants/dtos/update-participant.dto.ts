import { MaxLength, IsEmail, IsOptional } from "class-validator";

export class UpdateParticipantDto {
  @MaxLength(100)
  @IsOptional()
  readonly name: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;
}
