import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUsersParamsDto {
  @IsInt()
  @IsOptional()
  // For converting the string param to number before validation
  @Type(() => Number)
  id?: number;
}
