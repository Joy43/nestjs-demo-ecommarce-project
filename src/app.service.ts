import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}  // Inject ConfigService

  getHello(): string {
    const appName = this.configService.get<string>('appName');  // use the injected service
    console.log(appName);
    return `hello ${appName}`;
  }
}
