import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //  정의되지 않은 속성이 요청 데이터에 포함되는 경우 해당 속성을 무시
      forbidNonWhitelisted: true, //누군가 이상한 요청을 보내면 리퀘스트 자체를 막아버림
      transform: true, //유저들이 보단 요청을 우리가 원하는 타입으로 변환해줌
    }),
  );
  await app.listen(3000);
}
bootstrap();
