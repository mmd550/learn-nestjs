import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Query,
  Headers,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamsDto } from './dtos/get-users-params.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './providers/users.service';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  public getUsers(
    @Param() params: GetUsersParamsDto,
    @Query() query: GetUsersQueryDto,
  ) {
    if (params.id) return this.usersService.findOneById(params.id);
    return this.usersService.findAll(query);
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
