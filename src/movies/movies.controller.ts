import { Body, Query } from '@nestjs/common';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { get } from 'http';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieID: string): Movie {
    return this.moviesService.getOne(movieID);
  }
  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }
  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }
  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}