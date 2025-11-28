import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { GatewayController } from './gateway.controller';
import { TcpApiGatewayModule } from './tcp-api-gateway/tcp-api.gateway.module';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { group } from 'console';

@Module({
  imports: [
    // TcpApiGatewayModule,
    ClientsModule.register([
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'profiles',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'profiles-consumer',
          },
          subscribe: {
            fromBeginning: true,
          },
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'users-consumer',
          },
        },
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        messageKey: 'profiles',
        formatters: {
          level(label) {
            return { level: label.toUpperCase() };
          },
        },
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        },
      },
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
