import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    /* Inject UsersService */
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(post: CreatePostDto) {
    const createdPost = this.postRepository.create(post);
    return this.postRepository.save(createdPost);
  }

  public async findAll(userId: string) {
    // const user = await this.usersService.findOneById(Number(userId));

    const posts = await this.postRepository.find({
      // needed if eager is not set to true
      // relations: {
      //   metaOptions: true,
      // },
    });

    return posts;
  }

  public async delete(id: number) {
    //Find the post
    const post = await this.postRepository.findOneBy({ id });

    // Delete the post (we can not delete meta option first because it has a foreign key to post)
    await this.postRepository.delete(id);
    //  Delete meta option
    if (post?.metaOptions?.id)
      await this.metaOptionRepository.delete(post.metaOptions.id);

    return {
      deleted: true,
      id,
    };
  }
}
