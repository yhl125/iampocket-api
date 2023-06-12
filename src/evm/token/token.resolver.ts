import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { BalanceService } from './token.service';
import { QuoteCurrency, Token } from './entities/token.entity';
@Resolver(() => Token)
export class TokenResolver {
  constructor(private readonly balanceService: BalanceService) {}
  @Query(() => [Token], { name: 'findEvmTokenBalance' })
  findBy(
    @Args('address') address: string,
    @Args('chainId', { type: () => Int }) chainId: number,
    @Args('quoteCurrency', { type: () => QuoteCurrency })
    quoteCurrency: QuoteCurrency,
  ) {
    return this.balanceService.findTokens(address, chainId, quoteCurrency);
  }
}
