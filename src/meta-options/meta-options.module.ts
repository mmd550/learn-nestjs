import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsService } from './providers/meta-options.service';
import { MetaOption } from './meta-option.entity';
import { MetaOptionsController } from './meta-options.controller';

@Module({
  providers: [MetaOptionsService],
  imports: [TypeOrmModule.forFeature([MetaOption])],
  controllers: [MetaOptionsController],
})
export class MetaOptionsModule {}
