import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/cloudanaryconfig/cloudinary.service';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
  let imageUrl = '';
  if (file) {
    const result = await this.cloudinaryService.uploadImage(file);
    imageUrl = (result as any).secure_url;
  }

  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  const user = await prisma.user.create({
    data: {
      ...createUserDto,
      password: hashedPassword,
      image: imageUrl,
    },
  });

  const token = this.jwtService.sign({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  const { password, ...safeUser } = user;
  return {
    status: 'success',
    message: 'User created successfully',
    data: safeUser,
    token,
  };
}

  async findAll() {
    return prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, file?: Express.Multer.File) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    let imageUrl = user.image;
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      imageUrl = (result as any).secure_url;
    }

    return prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        image: imageUrl,
      },
    });
  }

  async remove(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return prisma.user.delete({ where: { id } });
  }
}
