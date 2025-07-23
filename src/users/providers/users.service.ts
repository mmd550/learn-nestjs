import { Injectable } from '@nestjs/common';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';

@Injectable()
export class UsersService {
  public findAll(query: GetUsersQueryDto) {
    console.log(query);
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  public findOneById(userId: number) {
    return {
      firstName: 'Alice',
      email: 'alice@doe.com',
      id: userId,
    };
  }
}
