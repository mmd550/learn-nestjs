import { Module } from '@nestjs/common';
import { TagService } from './providers/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';

@Module({
  providers: [TagService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
