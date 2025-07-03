import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import Joi from 'joi';
import appConfig from './config/app.config';
@Module({
  imports: [
    // ------all env file loading---
    ConfigModule.forRoot({
      isGlobal:true, // makes configall module
      load:[appConfig]
    //  validationSchema: Joi.object({
    //     APP_NAME: Joi.string().default('MyApp'),
    //     PORT: Joi.number().default(3000),
    //     DATABASE_HOST: Joi.string().required(),
    //     DATABASE_PORT: Joi.number().default(5432),
    //   }),
    }),
    AuthModule

  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
