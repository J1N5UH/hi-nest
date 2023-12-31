import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController], //클라이언트의 요청을 처리
  providers: [MoviesService], // 비즈니스 로직 구현
})
export class MoviesModule {}
