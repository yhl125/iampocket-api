import { Module } from '@nestjs/common';
import { BalanceModule } from './token/token.module';
import { NftModule } from './nft/nft.module';
import { ValhaModule } from './valha/valha.module';
import { BridgeModule } from './bridge/bridge.module';
import { SwapModule } from './swap/swap.module';

@Module({
  imports: [BalanceModule, NftModule, ValhaModule, BridgeModule, SwapModule],
})
export class EvmModule {}
