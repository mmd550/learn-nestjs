import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOpitonsService: MetaOptionsService) {}

  @Post()
  async createMetaOption(@Body() metaOption: CreatePostMetaOptionsDto) {
    return this.metaOpitonsService.create(metaOption);
  }
}
