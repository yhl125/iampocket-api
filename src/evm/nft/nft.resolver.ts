import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { NftService } from './nft.service';
import { Nft } from './entities/nft.entity';

@Resolver(() => Nft)
export class NftResolver {
  constructor(private readonly nftService: NftService) {}

  @Query(() => [Nft], { name: 'findEvmNftBalance' })
  findWithNftFetch(
    @Args('address') address: string,
    @Args('chainIds', { type: () => [Int] }) chainIds: number[],
  ) {
    return this.nftService.findNftsByChainIds(address, chainIds);
  }
}
