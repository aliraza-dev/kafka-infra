import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'profile',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'profile-consumer',
          },
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'profile',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'profile-consumer',
          },
        },
      },
    ]),
  ],
})
export class TcpApiGatewayModule {}
