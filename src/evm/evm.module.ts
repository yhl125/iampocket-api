import { Module } from '@nestjs/common';
import { BalanceModule } from './token/token.module';
import { NftModule } from './nft/nft.module';
import { ValhaModule } from './valha/valha.module';

@Module({ imports: [BalanceModule, NftModule, ValhaModule] })
export class EvmModule {}
