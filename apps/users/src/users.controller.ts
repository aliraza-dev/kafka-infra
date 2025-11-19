import { Controller, Get, Inject, Logger, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ClientKafkaProxy,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(
    private readonly usersService: UsersService,
    @Inject('PROFILE_SERVICE')
    private readonly profileServiceClient: ClientKafkaProxy,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('getHello called');
    return this.usersService.getHello();
  }

  @MessagePattern({ cmd: 'user.findAll' })
  async getUsers(@Payload() request: any) {
    console.log('request', request.value.toString());
    console.log('partition', request.partition);

    const profileData = await this.profileServiceClient
      .send({ cmd: 'profile.getOne' }, { id: 1 })
      .toPromise();

    this.profileServiceClient.emit(
      { cmd: 'profile.createdLogs' },
      { event: 'User requested profiles' },
    );

    return profileData;
  }
}
