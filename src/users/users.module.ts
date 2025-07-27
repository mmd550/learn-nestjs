import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(profileConfig),
    TypeOrmModule.forFeature([User]),
  ],
})
export class UsersModule {}
