import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
      bufferLogs: true,
    },
  );
  app.useLogger(app.get(Logger));

  await app.listen().then(() => {
    console.log('User microservice is listening on port 3001');
  });
}
bootstrap();
