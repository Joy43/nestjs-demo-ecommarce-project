import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudanaryconfig/cloudinary.module';
import { AuthModule } from './auth/auth.module';

import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    DatabaseModule,
    UsersModule,
    CloudinaryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],  //  ONLY AppService because others are provided by their modules
})
export class AppModule {}
