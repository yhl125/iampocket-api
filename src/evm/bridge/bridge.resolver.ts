import { Args, Int, Resolver } from '@nestjs/graphql';
import { BridgeService } from './bridge.service';
import { Query } from '@nestjs/graphql';
import {
  BridgeBuildTxDataWithApproveData,
  BridgeQuote,
  BridgeRouteInput,
  BridgeSupportedToken,
} from './entities/bridge.entities';

@Resolver()
export class BridgeResolver {
  constructor(private readonly bridgeService: BridgeService) {}
  @Query(() => [BridgeSupportedToken], {
    name: 'findBridgeSupportedFromTokens',
  })
  findSupportedFromTokensBy(
    @Args('fromChainId', { type: () => Int }) fromChainId: number,
    @Args('toChainId', { type: () => Int }) toChainId: number,
  ) {
    return this.bridgeService.findSupportedFromTokens(fromChainId, toChainId);
  }
  @Query(() => [BridgeSupportedToken], {
    name: 'findBridgeSupportedToTokens',
  })
  findSupportedToTokensBy(
    @Args('fromChainId', { type: () => Int }) fromChainId: number,
    @Args('toChainId', { nullable: true, type: () => Int }) toChainId?: number,
  ) {
    return this.bridgeService.findSupportedToTokens(fromChainId, toChainId);
  }
  @Query(() => BridgeQuote, { name: 'findBridgeQuote' })
  findBridgeQuoteBy(
    @Args('fromChainId', { type: () => Int }) fromChainId: number,
    @Args('fromTokenAddress') fromTokenAddress: string,
    @Args('toChainId', { type: () => Int }) toChainId: number,
    @Args('toTokenAddress') toTokenAddress: string,
    @Args('fromAmount') fromAmount: string,
    @Args('userAddress') userAddress: string,
    @Args('sort') sort: string,
    @Args('isContractCall') isContractCall: boolean,
    @Args('defaultSwapSlippage') defaultSwapSlippage: number,
    @Args('recipient', { nullable: true }) recipient?: string,
  ) {
    return this.bridgeService.findBridgeQuote(
      fromChainId,
      fromTokenAddress,
      toChainId,
      toTokenAddress,
      fromAmount,
      userAddress,
      sort,
      isContractCall,
      defaultSwapSlippage,
      recipient,
    );
  }
  @Query(() => BridgeBuildTxDataWithApproveData, {
    name: 'findBridgeRouteTransactionData',
  })
  findBridgeRouteTransactionDataBy(
    @Args('route', { type: () => BridgeRouteInput }) route: BridgeRouteInput,
  ) {
    return this.bridgeService.buildRouteTrasactionData(route);
  }
}
