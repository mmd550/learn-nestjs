import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(query: GetUsersQueryDto) {
    const isAuth = this.authService.isAuthenticated();
    console.log({ query, isAuth });
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
        id: 1234,
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
        id: 234,
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
