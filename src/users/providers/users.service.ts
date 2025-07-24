import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting AuthService
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * Injecting ConfigService
     */
    private readonly configService: ConfigService,

    /**
     * Injecting user config
     */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  public findAll(query: GetUsersQueryDto) {
    const environment = this.configService.get<string>('S3_BUCKET');
    const databaseName = this.configService.get<string>('database.name');
    const profileApiKey = this.profileConfiguration.apiKey;
    const isAuth = this.authService.isAuthenticated();
    console.log({ query, isAuth, environment, databaseName, profileApiKey });
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
    const user = {
      firstName: 'Alice',
      email: 'alice@doe.com',
      id: userId,
    };

    if (!user) throw new NotFoundException();
    return user;
  }
}
