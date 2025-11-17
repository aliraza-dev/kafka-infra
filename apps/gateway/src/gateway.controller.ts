import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('PROFILE_SERVICE')
    private readonly profileServiceClient: ClientProxy,
  ) {}

  @Get('users')
  async getUsers(@Req() request: Request) {
    return this.userServiceClient
      .send({ cmd: 'user.findAll' }, { abc: 'String' })
      .toPromise();
  }
}
