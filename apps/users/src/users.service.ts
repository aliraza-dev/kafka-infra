import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    const data = {
      firstName: 'Ali',
      lastName: 'Raza',
      age: 32,
    };

    this.logger.log('getUsers called', JSON.stringify(data));

    return data;
  }
}
