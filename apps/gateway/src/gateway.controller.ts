import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ClientKafkaProxy, RpcException } from '@nestjs/microservices';
import { catchError, map, tap, throwError } from 'rxjs';
import { Kafka } from 'kafkajs';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientKafkaProxy,
    @Inject('PROFILE_SERVICE')
    private readonly profileServiceClient: ClientKafkaProxy,
    private readonly gatewayService: GatewayService,
  ) {}

  @Get('users')
  async getUsers(@Req() request: Request) {
    return this.userServiceClient
      .send({ cmd: 'user.findAll' }, { abc: 'String' })
      .toPromise();
  }

  @Get('profiles')
  async getProfiles() {
    const prof = this.userServiceClient.send({ cmd: 'user.findAll' }, {}).pipe(
      tap((response) => console.log('User Service Response:', response)),
      map((response) => response),
      catchError((err) => throwError(() => new RpcException(err))),
    );

    console.log('prof', prof);

    return prof;
  }

  @Get('/create-profiles')
  async createProfiles() {
    return await this.gatewayService.createProfile({
      username: 'testuser',
      email: 'johndoe@gmail.com',
    });
  }
}
