import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from './../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly UsersService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    const user = this.UsersService.findOneById(1234);

    if (user) return 'SAMPLE_TOKEN';
  }

  public isAuthenticated() {
    return true;
  }
}
