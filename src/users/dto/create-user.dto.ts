import { IsEmail, IsString, IsEnum } from 'class-validator';
import { Role } from 'generated/prisma';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(Role, { message: 'Role must be one of: SELLER, ADMIN, USER' })
  role: Role;

  @IsString()
  image: string;
}
