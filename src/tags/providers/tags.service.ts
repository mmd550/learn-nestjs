import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(tag: CreateTagDto) {
    const createdTag = this.tagRepository.create(tag);
    return this.tagRepository.save(createdTag);
  }

  public async findOneById(id: number) {
    return this.tagRepository.findOneBy({ id });
  }

  public async findMultipleTags(ids: number[]) {
    return this.tagRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  public async delete(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return this.tagRepository.delete(id);
  }

  public async softDelete(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return this.tagRepository.softRemove(tag);
  }
}
