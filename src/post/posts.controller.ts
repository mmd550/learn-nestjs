import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * GET localhost:3000/posts/:userId
   */
  @Get('{/:userId}')
  public getPosts() {
    return this.postsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: 200,
    description: 'Post created successfully',
  })
  public createPost(@Body() body: CreatePostDto) {
    return this.postsService.create(body);
  }

  @Patch()
  public updatePost(@Body() body: UpdatePostDto) {
    return this.postsService.update(body);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
