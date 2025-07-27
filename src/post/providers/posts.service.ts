import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    /* Inject UsersService */
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async findAll(userId: string) {
    const user = await this.usersService.findOneById(Number(userId));
    if (user)
      return [
        {
          title: 'Post1',
          description: 'Post description1',
          user,
        },
        {
          title: 'Post2',
          description: 'Post description2',
          user,
        },
      ];
  }
}
