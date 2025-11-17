import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.port ?? 3003).then(() => {
    console.log(
      `Gateway is running on http://localhost:${process.env.port ?? 3003}/api`,
    );
  });
}
bootstrap();
