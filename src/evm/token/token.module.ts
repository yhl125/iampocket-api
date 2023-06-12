import { Module } from '@nestjs/common';
import { BalanceService } from './token.service';
import { TokenResolver } from './token.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TokenResolver, BalanceService],
})
export class BalanceModule {}
