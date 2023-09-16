import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController], //클라이언트의 요청을 처리
  providers: [MoviesService], // 비즈니스 로직 구현
})
export class AppModule {}
