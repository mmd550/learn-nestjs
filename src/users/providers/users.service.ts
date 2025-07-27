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
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

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

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public findAll(query: GetUsersQueryDto) {
    console.log(query);
    return this.userRepository.find();
  }

  public async findOneById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  public async create(user: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser)
      throw new BadRequestException(
        'User with this email address already exists',
      );

    let newUser = this.userRepository.create(user);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }

  public async update(user: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!existingUser) throw new NotFoundException('User not found');
    const updatedUser = this.userRepository.merge(existingUser, user);
    return this.userRepository.save(updatedUser);
  }
}
