import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { BalanceService } from './token.service';
import { QuoteCurrency, Token } from './entities/token.entity';
@Resolver(() => Token)
export class TokenResolver {
  constructor(private readonly balanceService: BalanceService) {}
  @Query(() => [Token], { name: 'findEvmTokenBalance' })
  findBy(
    @Args('address') address: string,
    @Args('chainIds', { type: () => [Int] }) chainIds: number[],
    @Args('quoteCurrency', { type: () => QuoteCurrency })
    quoteCurrency: QuoteCurrency,
  ) {
    return this.balanceService.findTokensByChainIds(
      address,
      chainIds,
      quoteCurrency,
    );
  }
}
