import { Args, Int, Resolver, Query } from '@nestjs/graphql';
import { SwapService } from './swap.service';
import { Price, Quote } from './entities/swap.entities';

@Resolver()
export class SwapResolver {
  constructor(private readonly swapService: SwapService) {}
  @Query(() => Quote, {
    name: 'findSwapQuote',
  })
  findBy(
    @Args('chainId', { type: () => Int }) chainId: number,
    @Args('sellToken') sellToken: string,
    @Args('buyToken') buyToken: string,
    @Args('sellAmount', { nullable: true }) sellAmount: string,
    @Args('buyAmount', { nullable: true }) buyAmount: string,
    @Args('slippagePercentage', { nullable: true }) slippagePercentage: string,
    @Args('takerAddress', { nullable: true })
    takerAddress?: `0x${string}`,
  ) {
    return this.swapService.findSwapQuote(
      chainId,
      sellToken,
      buyToken,
      sellAmount,
      buyAmount,
      slippagePercentage,
      takerAddress,
    );
  }
  @Query(() => Price, {
    name: 'findSwapPrice',
  })
  findPriceBy(
    @Args('chainId', { type: () => Int }) chainId: number,
    @Args('sellToken') sellToken: string,
    @Args('buyToken') buyToken: string,
    @Args('sellAmount', { nullable: true }) sellAmount?: string,
    @Args('buyAmount', { nullable: true }) buyAmount?: string,
    @Args('takerAddress', { nullable: true }) takerAddress?: `0x${string}`,
  ) {
    return this.swapService.findPrice(
      chainId,
      sellToken,
      buyToken,
      sellAmount,
      buyAmount,
      takerAddress,
    );
  }
}
