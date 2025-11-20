import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { ProfilesModule } from './profiles.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProfilesModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'profiles-consumer',
        },
      },
      // options: {
      //   port: 3002,
      // },
      bufferLogs: true,
    },
  );
  app.useLogger(app.get(Logger));

  await app.listen().then(() => {
    console.log('Profile microservice is listening on port 3002');
  });
}

bootstrap();
