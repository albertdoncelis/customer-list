import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // tslint:disable-next-line:no-console
  console.log(`backend is listening: ${AppModule.port}`);

  await app.listen(AppModule.port);
}
bootstrap();
