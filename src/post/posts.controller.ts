import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from 'src/shared-dtos/pagination.dto';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query() query: PaginationDto) {
    return this.postsService.findAll(query);
  }
}
