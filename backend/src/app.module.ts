import { Module } from '@nestjs/common';
import { UtilsModule } from './utils/utils.module';
import { ConfigService } from './utils/config/config.service';
import { Config } from './utils/config/config.enum';

@Module({
  imports: [UtilsModule],
})
export class AppModule {

  static host: string;
  static port: string | number;
  static isDev: boolean;

  constructor(private readonly configService: ConfigService) {
    AppModule.host = configService.get(Config.HOST);
    AppModule.isDev = configService.isDevelopment;
    AppModule.port = AppModule.normalizedPort(configService.get(Config.PORT));
  }

  private static normalizedPort(port: string | number): number | string {
    const portNumber: number = typeof port === 'string' ? parseInt(port, 10) : port;

    if (isNaN(portNumber)) {
      return port;
    } else if (portNumber > 0) {
      return portNumber;
    }
  }
}
