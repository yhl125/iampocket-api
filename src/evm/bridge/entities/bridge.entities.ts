import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
class BridgeAsset {
  @Field(() => Int)
  chainId: number;
  @Field()
  address: string;
  @Field()
  symbol: string;
  @Field()
  name: string;
  @Field(() => Int)
  decimals: number;
  @Field()
  icon: string;
  @Field()
  logoURI: string;
  @Field({ nullable: true })
  chainAgnosticId?: string;
}

@ObjectType()
export class BridgeRoute {
  @Field()
  routeId: string;
  @Field()
  isOnlySwapRoute: boolean;
  @Field()
  fromAmount: string;
  @Field()
  toAmount: string;
  @Field(() => [String])
  usedBridgeNames: string[];
  @Field(() => GraphQLJSON)
  minimumGasBalances: JSON;
  @Field(() => GraphQLJSON)
  chainGasBalances: JSON;
  @Field(() => Int)
  totalUserTx: number;
  @Field()
  sender: string;
  @Field()
  recipient: string;
  @Field(() => Float)
  totalGasFeesInUsd: number;
  @Field(() => Float)
  receivedValueInUsd: number;
  @Field(() => Float)
  inputValueInUsd: number;
  @Field(() => Float)
  outputValueInUsd: number;
  /**
   *   Array of Transactions in the bridging route
   *   https://docs.socket.tech/socket-api/v2/quote
   */
  @Field(() => [GraphQLJSON])
  userTxs: JSON[];
  @Field(() => Int)
  serviceTime: number;
  @Field(() => Int)
  maxServiceTime: number;
}

@InputType()
export class BridgeRouteInput {
  @Field()
  routeId: string;
  @Field()
  isOnlySwapRoute: boolean;
  @Field()
  fromAmount: string;
  @Field()
  toAmount: string;
  @Field(() => [String])
  usedBridgeNames: string[];
  @Field(() => GraphQLJSON)
  minimumGasBalances: JSON;
  @Field(() => GraphQLJSON)
  chainGasBalances: JSON;
  @Field(() => Int)
  totalUserTx: number;
  @Field()
  sender: string;
  @Field()
  recipient: string;
  @Field(() => Float)
  totalGasFeesInUsd: number;
  @Field(() => Float)
  receivedValueInUsd: number;
  @Field(() => Float)
  inputValueInUsd: number;
  @Field(() => Float)
  outputValueInUsd: number;
  /**
   *   Array of Transactions in the bridging route
   *   https://docs.socket.tech/socket-api/v2/quote
   */
  @Field(() => [GraphQLJSON])
  userTxs: JSON[];
  @Field(() => Int)
  serviceTime: number;
  @Field(() => Int)
  maxServiceTime: number;
}
@ObjectType()
export class BridgeQuote {
  @Field(() => [BridgeRoute])
  routes: BridgeRoute[];
  @Field(() => BridgeAsset)
  fromAsset: BridgeAsset;
  @Field(() => BridgeAsset)
  toAsset: BridgeAsset;
}

@ObjectType()
export class BridgeAllowance {
  @Field()
  value: string;
  @Field()
  tokenAddress: string;
}

// For Approval-BuildTx Query
@ObjectType()
export class BridgeApprovalData {
  @Field()
  data: string;
  @Field()
  to: string;
  @Field()
  from: string;
}

// For BuildTx
@ObjectType()
export class BridgeBuildTxApprovalData {
  @Field()
  minimumApprovalAmount: string;
  @Field()
  approvalTokenAddress: string;
  @Field()
  allowanceTarget: string;
  @Field()
  owner: string;
}

@ObjectType()
export class BridgeBuildTxDataWithApproveData {
  @Field()
  userTxType: string;
  @Field()
  txData: string;
  @Field()
  txTarget: string;
  @Field()
  chainId: string;
  @Field()
  value: string;
  @Field(() => Int)
  userTxIndex: number;
  @Field(() => BridgeApprovalData, { nullable: true })
  approvalData?: BridgeApprovalData;
}

@ObjectType()
export class BridgeSupportedToken {
  @Field({ nullable: true })
  name?: string;
  @Field()
  address: string;
  @Field(() => Int)
  chainId: number;
  @Field(() => Int)
  decimals: number;
  @Field()
  symbol: string;
  @Field()
  logoUri: string;
  @Field()
  chainAgnosticIc: string;
}

@InputType()
export class BridgeStatusInput {
  @Field()
  transactionHash: string;
  @Field()
  fromChainId: string;
  @Field()
  toChainId: string;
  /**
   *    For Polygon Native Bridge and Arbitrum Native Bridge,
   *    the bridgeName paramater is required to be filled in.
   *    For the others, it is optional.
   */
  @Field({ nullable: true })
  bridgeName?: string;
}

@ObjectType()
export class BridgeStatus {
  @Field()
  sourceTransacitonHash: string;
  // READY, PENDING, COMPLETED, FAILED
  @Field()
  sourceTxStatus: string;
  @Field()
  destinationTransactionHash: string;
  // READY, PENDING, COMPLETED, FAILED
  @Field()
  destinationTxStatus: string;
  @Field(() => Int)
  fromChainId: number;
  @Field(() => Int)
  toChainId: number;
  @Field(() => BridgeAsset)
  fromAsset: BridgeAsset;
  @Field(() => BridgeAsset)
  toAsset: BridgeAsset;
  @Field()
  srcTokenPrice: string;
  @Field()
  destTokenPrice: string;
  @Field()
  fromAmount: string;
  @Field()
  toAmount: string;
  @Field()
  sender: string;
  @Field()
  recipient: string;
}
