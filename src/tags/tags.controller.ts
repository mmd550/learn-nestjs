import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({
    summary: 'Create a new tag',
  })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created.',
  })
  @Post()
  public createTag(@Body() tag: CreateTagDto) {
    return this.tagsService.create(tag);
  }

  @Delete()
  public async deleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  @Delete('soft')
  public async softDeleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softDelete(id);
  }
}
