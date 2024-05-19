import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appInitializor } from './app.initializor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appInitializor(app);
  await app.listen(3000);
}
bootstrap();
