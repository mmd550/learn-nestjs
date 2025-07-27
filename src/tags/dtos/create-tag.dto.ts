import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  slug: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;
}
