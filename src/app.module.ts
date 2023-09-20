import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './movies/app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController], //클라이언트의 요청을 처리
  providers: [], // 비즈니스 로직 구현
})
export class AppModule {}
