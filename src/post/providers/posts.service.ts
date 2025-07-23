import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/shared-dtos/pagination.dto';

@Injectable()
export class PostsService {
  public findAll(query: PaginationDto) {
    console.log(query);
    return [
      {
        title: 'Post',
        description: 'Post description',
      },
    ];
  }
}
