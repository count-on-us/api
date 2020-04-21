import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, IsEmail } from "class-validator";

export class CreateParticipantDto {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'The participant name.',
    maxLength: 100,
    example: 'Maria Doe',
  })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The participant email.',
    example: 'participant@domain.com'
  })
  readonly email: string;
}
