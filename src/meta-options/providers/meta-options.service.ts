import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(metaOption: CreatePostMetaOptionsDto) {
    const metaOptionCreated = this.metaOptionRepository.create(metaOption);
    return this.metaOptionRepository.save(metaOptionCreated);
  }

  public async findOne(metaOptionId: number) {
    return this.metaOptionRepository.findOne({
      where: {
        id: metaOptionId,
      },
    });
  }
}
