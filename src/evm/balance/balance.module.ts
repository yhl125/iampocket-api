import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceResolver } from './balance.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BalanceResolver, BalanceService],
})
export class BalanceModule {}
