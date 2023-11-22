import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import {
  BridgeBuildTxDataWithApproveData,
  BridgeQuote,
  BridgeRouteInput,
  BridgeStatus,
  BridgeStatusInput,
  BridgeSupportedToken,
} from './entities/bridge.entities';
import {
  IBridgeBuildTxApproveDataInput,
  IBridgeBuildTxResult,
  IBridgeQuoteResponse,
  IBridgeStatusData,
  ICheckAllowanceInput,
  ICheckAllowanceResult,
} from 'src/utils/bridge.utils';

@Injectable()
export class BridgeService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async findSupportedFromTokens(fromChainId: number, toChainId: number) {
    const url = `https://api.socket.tech/v2/token-list/from-token-list?fromChainId=${fromChainId}&toChainId=${toChainId}&isShortList=true`;
    const data: BridgeSupportedToken[] = (
      await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'API-KEY': this.configService.get<string>(
              'SOCKET_BRIDGE_PUBLIC_KEY',
            ),
          },
        }),
      )
    ).data.result;
    return data;
  }
  async findSupportedToTokens(fromChainId: number, toChainId?: number) {
    const url = `https://api.socket.tech/v2/token-list/to-token-list?fromChainId=${fromChainId}&toChainId=${toChainId}&isShortList=true`;
    const data: BridgeSupportedToken[] = (
      await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'API-KEY': this.configService.get<string>(
              'SOCKET_BRIDGE_PUBLIC_KEY',
            ),
          },
        }),
      )
    ).data.result;
    return data;
  }
  async findBridgeQuote(
    fromChainId: number,
    fromTokenAddress: string,
    toChainId: number,
    toTokenAddress: string,
    fromAmount: string,
    userAddress: string,
    sort: string,
    isContractCall: boolean,
    defaultSwapSlippage: number,
    recipient?: string,
  ) {
    const url = `http://api.socket.tech/v2/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&fromAmount=${fromAmount}&userAddress=${userAddress}&recipient=${recipient}&sort=${sort}&defaultSwapSlippage=${defaultSwapSlippage}&isContractCall=${isContractCall}&bridgeWithInsurance=true&singleTxOnly=true`;
    const bridgeQuoteResponseData = (
      await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'API-KEY': this.configService.get<string>(
              'SOCKET_BRIDGE_PUBLIC_KEY',
            ),
          },
        }),
      )
    ).data.result;
    return this.bridgeQuoteResponseToBridgeQuote(bridgeQuoteResponseData);
  }
  bridgeQuoteResponseToBridgeQuote(bridgeQuoteResponse: IBridgeQuoteResponse) {
    const bridgeQuote: BridgeQuote = {
      routes: [...bridgeQuoteResponse.routes],
      fromAsset: bridgeQuoteResponse.fromAsset,
      toAsset: bridgeQuoteResponse.toAsset,
    };
    return bridgeQuote;
  }
  async buildRouteTrasactionData(
    route: BridgeRouteInput,
  ): Promise<BridgeBuildTxDataWithApproveData> {
    const url = `https://api.socket.tech/v2/build-tx`;
    const body = { route: route };
    const routeTrasactionData: IBridgeBuildTxResult = (
      await lastValueFrom(
        this.httpService.post(url, body, {
          headers: {
            'API-KEY': this.configService.get<string>(
              'SOCKET_BRIDGE_PUBLIC_KEY',
            ),
          },
        }),
      )
    ).data.result;
    if (routeTrasactionData.approvalData !== null) {
      const {
        approvalTokenAddress,
        allowanceTarget,
        owner,
        minimumApprovalAmount,
      } = routeTrasactionData.approvalData;
      const allowanceData = await this.checkAllowance({
        chainId: Number(routeTrasactionData.chainId),
        tokenAddress: approvalTokenAddress,
        allowanceTarget: allowanceTarget,
        owner: owner,
      });
      if (minimumApprovalAmount > allowanceData.value) {
        const approvalData = await this.findApprovalTransactionData({
          chainId: Number(routeTrasactionData.chainId),
          minimumApprovalAmount: minimumApprovalAmount,
          allowanceTarget: allowanceTarget,
          owner: owner,
          approvalTokenAddress: approvalTokenAddress,
        });
        const bridgeBuildTxDataWithApprovalData = {
          chainId: routeTrasactionData.chainId,
          userTxType: routeTrasactionData.userTxType,
          txData: routeTrasactionData.txData,
          txTarget: routeTrasactionData.txTarget,
          value: routeTrasactionData.value,
          userTxIndex: routeTrasactionData.userTxIndex,
          approvalData: approvalData,
        };
        return bridgeBuildTxDataWithApprovalData;
      } else {
        const bridgeBuildTxDataWithApprovalData = {
          chainId: routeTrasactionData.chainId,
          userTxType: routeTrasactionData.userTxType,
          txData: routeTrasactionData.txData,
          txTarget: routeTrasactionData.txTarget,
          value: routeTrasactionData.value,
          userTxIndex: routeTrasactionData.userTxIndex,
          approvalData: null,
        };
        return bridgeBuildTxDataWithApprovalData;
      }
    } else {
      const bridgeBuildTxDataWithApprovalData = {
        chainId: routeTrasactionData.chainId,
        userTxType: routeTrasactionData.userTxType,
        txData: routeTrasactionData.txData,
        txTarget: routeTrasactionData.txTarget,
        value: routeTrasactionData.value,
        userTxIndex: routeTrasactionData.userTxIndex,
        approvalData: null,
      };
      return bridgeBuildTxDataWithApprovalData;
    }
  }
  async findApprovalTransactionData(
    bridgeBuildTxApprovalDataInput: IBridgeBuildTxApproveDataInput,
  ) {
    const {
      chainId,
      minimumApprovalAmount,
      approvalTokenAddress,
      allowanceTarget,
      owner,
    } = bridgeBuildTxApprovalDataInput;
    const url = `https://api.socket.tech/v2/approval/build-tx?chainID=${chainId}&amount=${minimumApprovalAmount}&tokenAddress=${approvalTokenAddress}&allowanceTarget=${allowanceTarget}&owner=${owner}`;
    const bridgeApprovalData = (
      await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'API-KEY': this.configService.get<string>(
              'SOCKET_BRIDGE_PUBLIC_KEY',
            ),
          },
        }),
      )
    ).data.result;
    return bridgeApprovalData;
  }
  async checkAllowance(allowanceInput: ICheckAllowanceInput) {
    const { chainId, tokenAddress, allowanceTarget, owner } = allowanceInput;
    const url = `https://api.socket.tech/v2/approval/check-allowance?chainID=${chainId}&tokenAddress=${tokenAddress}&allowanceTarget=${allowanceTarget}&owner=${owner}`;
    const checkAllowanceData: ICheckAllowanceResult = (
      await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'API-KEY': this.configService.get<string>(
              'SOCKET_BRIDGE_PUBLIC_KEY',
            ),
          },
        }),
      )
    ).data.result;
    return checkAllowanceData;
  }
  async checkBridgeStatus(bridgeStatusInput: BridgeStatusInput) {
    const { transactionHash, fromChainId, toChainId, bridgeName } =
      bridgeStatusInput;
    const url = `https://api.socket.tech/v2/bridge-status?transactionHash=${transactionHash}&fromChainId=${fromChainId}&toChainId=${toChainId}&bridgeName=${bridgeName}`;
    const bridgeStatusData = (
      await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'API-KEY': this.configService.get<string>(
              'SOCKET_BRIDGE_PUBLIC_KEY',
            ),
          },
        }),
      )
    ).data.result;
    return this.bridgeStatusDataTOBridStatusObjectType(bridgeStatusData);
  }
  bridgeStatusDataTOBridStatusObjectType(bridgeStatusData: IBridgeStatusData) {
    const bridgeStatus: BridgeStatus = {
      sourceTransacitonHash: bridgeStatusData.sourceTransactionHash,
      sourceTxStatus: bridgeStatusData.sourceTransactionHash,
      destinationTransactionHash: bridgeStatusData.sourceTransactionHash,
      destinationTxStatus: bridgeStatusData.destinationTxStatus,
      fromChainId: bridgeStatusData.fromChainId,
      toChainId: bridgeStatusData.toChainId,
      fromAsset: bridgeStatusData.fromAsset,
      toAsset: bridgeStatusData.toAsset,
      srcTokenPrice: bridgeStatusData.srcTokenPrice,
      destTokenPrice: bridgeStatusData.destTokenPrice,
      fromAmount: bridgeStatusData.fromAmount,
      toAmount: bridgeStatusData.toAmount,
      sender: bridgeStatusData.sender,
      recipient: bridgeStatusData.recipient,
    };
    return bridgeStatus;
  }
}
