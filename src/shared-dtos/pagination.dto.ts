import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;
}
