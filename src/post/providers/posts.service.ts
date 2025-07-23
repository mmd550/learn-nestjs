import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    /* Inject UsersService */
    private readonly usersService: UsersService,
  ) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(Number(userId));
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
