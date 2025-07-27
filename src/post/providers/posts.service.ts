import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { UpdatePostDto } from '../dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,
  ) {}

  public async create({ tags, ...post }: CreatePostDto) {
    const user = await this.usersService.findOneById(post.authorId);

    const foundTags = tags
      ? await this.tagsService.findMultipleTags(tags)
      : undefined;

    const createdPost = this.postRepository.create({
      ...post,
      author: user,
      tags: foundTags,
    });

    return this.postRepository.save(createdPost);
  }

  public async findAll() {
    const posts = await this.postRepository.find({
      // needed if eager is not set to true
      relations: {
        metaOptions: true,
        author: true,
        tags: true,
      },
    });

    return posts;
  }

  public async update({ tags, ...patch }: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id: patch.id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const foundTags = tags
      ? await this.tagsService.findMultipleTags(tags)
      : undefined;

    return this.postRepository.save({
      ...post,
      ...patch,
      tags: foundTags ? foundTags : post.tags,
    });
  }

  public async delete(id: number) {
    //Find the post
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postRepository.delete(id);

    return {
      deleted: true,
      id,
    };
  }
}
