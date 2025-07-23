import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Query,
  Headers,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamsDto } from './dtos/get-users-params.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  /**
   * Final Endpoint - /users/id?limit=10&page=1
   * Param id - optional, convert to an integer, can not have default value
   * Query limit - integer, default 10
   * Query page - integer, default 1
   * ==> Use Cases
   * /users/ -> returns all users with default pagination
   * /users/1234 -> returns one user who's id is 1234
   * /users?limit=20&page=2 -> returns page 2 with limit of 20
   */
  @Get('{/:id}')
  public getUsers(
    @Param() params: GetUsersParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number | undefined,
  ) {
    console.log(params, limit, page);
    return 'You sent a get request to users endpoint';
  }

  @Post()
  public createUser(
    @Body() body: CreateUserDto,
    @Ip() ip: string,
    @Headers() headers: unknown,
  ) {
    console.log(body, { ip }, { headers });
    return 'You sent a post request to users endpoint';
  }

  @Patch()
  public updateUser(@Body() body: UpdateUserDto) {
    return body;
  }
}
