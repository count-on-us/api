import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
	@IsEmail()
	@ApiProperty({
		description: 'The user email.',
	})
	readonly email: string;

	@IsNotEmpty()
	@ApiProperty({
    description: 'The user password.',
    example: '123p@assWord',
	})
	readonly password: string;
}
