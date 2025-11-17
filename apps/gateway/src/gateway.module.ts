import { Module } from '@nestjs/common';

import { GatewayController } from './gateway.controller';
import { TcpApiGatewayModule } from './tcp-api-gateway/tcp-api.gateway.module';

@Module({
  imports: [TcpApiGatewayModule],
  controllers: [GatewayController],
})
export class GatewayModule {}
