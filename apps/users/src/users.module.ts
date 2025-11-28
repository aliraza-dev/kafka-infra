import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerModule } from 'nestjs-pino';
import { single } from 'rxjs';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        messageKey: 'users',
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
    // ClientsModule.register([
    //   {
    //     name: 'PROFILE_SERVICE',
    //     transport: Transport.TCP,
    //     options: {
    //       host: 'localhost',
    //       port: 3002,
    //     },
    //   },
    // ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
