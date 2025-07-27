import { Module } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsController } from './tags.controller';

@Module({
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
