import { Controller, Get, Logger, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    this.logger.log('getHello called');
    return this.usersService.getHello();
  }

  @MessagePattern({ cmd: 'user.findAll' })
  getUsers(request: any) {
    console.log('request', request);
    return this.usersService.getUsers();
  }
}
