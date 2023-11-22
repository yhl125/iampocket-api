import { Module } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { BridgeResolver } from './bridge.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BridgeResolver, BridgeService],
})
export class BridgeModule {}
