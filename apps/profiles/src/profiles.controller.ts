import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

import { ProfilesService } from './profiles.service';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  getHello(): string {
    return this.profilesService.getHello();
  }

  @MessagePattern({ cmd: 'profile.findAll' })
  getProfiles() {
    return this.profilesService.getProfiles();
  }

  @MessagePattern({ cmd: 'profile.getOne' })
  getProfileById(data: { id: number }) {
    // Dummy implementation for fetching a profile by ID
    const profiles = [
      {
        id: 1,
        companyName: 'Tech Solutions',
        location: 'New York',
        employees: 150,
      },
      {
        id: 2,
        companyName: 'Innovatech',
        location: 'San Francisco',
        employees: 200,
      },
    ];

    return profiles.find((profile) => profile.id === data.id);
  }

  @EventPattern({ cmd: 'profile.createdLogs' })
  handleProfileCreatedLogs(data: any) {
    console.log('Profile Created Event Received:', data);
  }
}
