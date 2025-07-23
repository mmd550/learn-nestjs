import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersQueryDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({ example: 10 })
  limit: number = 10;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({ example: 1 })
  page: number = 1;
}
