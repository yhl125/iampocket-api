import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { BalanceService } from './balance.service';
import { Balance } from './entities/balance.entity';
@Resolver(() => Balance)
export class BalanceResolver {
  constructor(private readonly balanceService: BalanceService) {}
  @Query(() => Balance, { name: 'findEvmBalance' })
  findBy(
    @Args('address') address: string,
    @Args('chainId', { type: () => Int }) chainId: number,
  ) {
    return this.balanceService.findBy(address, chainId);
  }

  @Query(() => Balance, { name: 'findEvmBalanceWithNft' })
  findWithNftFetch(
    @Args('address') address: string,
    @Args('chainId', { type: () => Int }) chainId: number,
  ) {
    return this.balanceService.findWithNft(address, chainId);
  }
}
