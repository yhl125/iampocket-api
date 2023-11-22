import { BridgeBuildTxApprovalData } from 'src/evm/bridge/entities/bridge.entities';

export class BridgeUtils {}

interface IBridgeAsset {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId?: string;
}

export interface IBridgeRoute {
  routeId: string;
  isOnlySwapRoute: boolean;
  fromAmount: string;
  toAmount: string;
  usedBridgeNames: string[];
  minimumGasBalances: JSON;
  chainGasBalances: JSON;
  totalUserTx: number;
  sender: string;
  recipient: string;
  totalGasFeesInUsd: number;
  receivedValueInUsd: number;
  inputValueInUsd: number;
  outputValueInUsd: number;
  userTxs: JSON[];
  serviceTime: number;
  maxServiceTime: number;
}
export interface IBridgeBuildTxResult {
  userTxType: string;
  txData: string;
  txTarget: string;
  chainId: string;
  value: string;
  userTxIndex: number;
  approvalData?: BridgeBuildTxApprovalData;
}
export interface IBridgeQuoteResponse {
  routes: IBridgeRoute[];
  fromChainId: number;
  fromAsset: IBridgeAsset;
  toChainId: number;
  toAsset: IBridgeAsset;
}

export interface ICheckAllowanceInput {
  chainId: number;
  tokenAddress: string;
  allowanceTarget: string;
  owner: string;
}

export interface ICheckAllowanceResult {
  value: string;
  tokenAddress: string;
}

export interface IBridgeBuildTxApproveDataInput {
  chainId: number;
  minimumApprovalAmount: string;
  approvalTokenAddress: string;
  allowanceTarget: string;
  owner: string;
}

interface IBridgeAsset {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId?: string;
}

export interface IBridgeStatusData {
  destinationTransactionHash: string;
  destinationTxStatus: string;
  sourceTransactionHash: string;
  sourceTxStatus: string;
  fromChainId: number;
  toChainId: number;
  fromAsset: IBridgeAsset;
  toAsset: IBridgeAsset;
  srcTokenPrice: string;
  destTokenPrice: string;
  fromAmount: string;
  toAmount: string;
  sender: string;
  recipient: string;
}
