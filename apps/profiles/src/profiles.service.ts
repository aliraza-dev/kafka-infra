import { Injectable, Logger } from '@nestjs/common';
import { interval } from 'rxjs';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name);
  getHello(): string {
    return 'Hello World!';
  }

  async getProfiles() {
    const data = await new Promise((resolve) => {
      const data = {
        companyName: 'Tech Solutions',
        location: 'New York',
        employees: 150,
      };
      resolve(data);
    });

    return data;
  }

  handleProfileCreatedLogs(data: any) {
    this.logger.log(`Profile Created Event Received: ${JSON.stringify(data)}`);
  }
}
