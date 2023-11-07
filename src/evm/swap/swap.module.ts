import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';
import { SwapResolver } from './swap.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SwapResolver, SwapService],
})
export class SwapModule {}
