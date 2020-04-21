import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsEmail, IsOptional } from "class-validator";

export class UpdateParticipantDto {
  @MaxLength(100)
  @IsOptional()
  @ApiProperty({
    description: 'The participant name.',
    maxLength: 100,
    example: 'Maria Doe',
  })
  readonly name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'The participant email.',
    example: 'participant@domain.com'
  })
  readonly email: string;
}
