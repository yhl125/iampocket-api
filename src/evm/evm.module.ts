import { Module } from '@nestjs/common';
import { BalanceModule } from './token/token.module';
import { NftModule } from './nft/nft.module';

@Module({ imports: [BalanceModule, NftModule] })
export class EvmModule {}
