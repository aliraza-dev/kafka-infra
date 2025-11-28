import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateProfileEvent } from './events';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('PROFILE_SERVICE')
    private readonly profileServiceClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.profileServiceClient.subscribeToResponseOf('profiles');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createProfile(profileData: any): Promise<void> {
    // Logic to create a profile
    this.profileServiceClient.emit(
      'profiles',
      new CreateProfileEvent(profileData.username, profileData.email),
    );
  }
}
