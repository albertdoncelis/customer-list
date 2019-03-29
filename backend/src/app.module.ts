import { Module } from '@nestjs/common';
import { UtilsModule } from './utils/utils.module';
import { ConfigService } from './utils/config/config.service';
import { Config } from './utils/config/config.enum';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { createConnection } from 'net';

@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forRootAsync({
      imports: [UtilsModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql' as 'mysql',
        host: configService.get(Config.MYSQL_HOST),
        port: 3306,
        username: configService.get(Config.MYSQL_USERNAME),
        password: configService.get(Config.MYSQL_PASSWORD),
        database: 'customer_list',
        entities: [
            __dirname + '/entities/*.entity{.ts,.js}',
        ],
        synchronize: true,
      }),
    }),
    CustomersModule,
  ],
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
