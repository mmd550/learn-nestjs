import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
  getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: 200,
    description: 'Post created successfully',
  })
  createPost(@Body() body: CreatePostDto) {
    return body;
  }

  @Patch()
  updatePost(@Body() body: UpdatePostDto) {
    return body;
  }
}
