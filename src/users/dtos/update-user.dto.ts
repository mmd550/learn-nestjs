import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  @Type(() => Number)
  id: number;
}
