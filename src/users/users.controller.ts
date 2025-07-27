import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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
  @Get()
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  public async getUsers(@Query() query: GetUsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Fetches a user by their id',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully based on the id',
  })
  public async getUserById(@Param() params: GetUsersParamsDto) {
    return this.usersService.findOneById(params.id);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  public createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch()
  @ApiOperation({
    summary: 'Updates a user',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  public updateUser(@Body() body: UpdateUserDto) {
    return this.usersService.update(body);
  }
}
