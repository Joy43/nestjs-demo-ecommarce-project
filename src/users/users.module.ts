import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryModule } from 'src/cloudanaryconfig/cloudinary.module';

@Module({
  imports: [
    DatabaseModule,
    CloudinaryModule,  //  must be imported here
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
