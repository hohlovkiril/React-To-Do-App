import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    cors: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
