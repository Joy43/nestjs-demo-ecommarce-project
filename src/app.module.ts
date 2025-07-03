import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

import { DatabaseModule } from './database/database.module';
;

import appConfig from './config/app.config';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudanaryconfig/cloudinary.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    // ------all env file loading---
    ConfigModule.forRoot({
      isGlobal:true, // makes configall module
      load:[appConfig]
  
    }),
  
    DatabaseModule,
    UsersModule,
    CloudinaryModule
  

  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, AuthService],
})
export class AppModule {}
