import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(tag: Tag) {
    return this.tagRepository.save(tag);
  }

  public async findOneById(id: number) {
    return this.tagRepository.findOne({ where: { id } });
  }
}
