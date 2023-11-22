export class SwapUtils {
  static findSwapApiUrl(chainId: number) {
    switch (chainId) {
      case 1:
        return ' https://api.0x.org/';
      case 5:
        return 'https://goerli.api.0x.org/';
      case 42161:
        return 'https://arbitrum.api.0x.org/';
      case 43114:
        return 'https://avalanche.api.0x.org/';
      case 8453:
        return 'https://base.api.0x.org/';
      case 56:
        return 'https://bsc.api.0x.org/';
      case 42220:
        return 'https://celo.api.0x.org/';
      case 250:
        return 'https://fantom.api.0x.org/';
      case 10:
        return 'https://optimism.api.0x.org/';
      case 137:
        return 'https://polygon.api.0x.org/';
      case 80001:
        return 'https://mumbai.api.0x.org/';
      default:
        throw new Error('Chain ID not Found');
    }
  }
  static findSwapPriceApiQuery(
    sellToken: string,
    buyToken: string,
    sellAmount?: string,
    buyAmount?: string,
    takerAddress?: string,
  ) {
    if (takerAddress && buyAmount) {
      return `swap/v1/price?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${buyAmount}&takerAdderss=${takerAddress}`;
    } else if (takerAddress && sellAmount) {
      return `swap/v1/price?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}&takerAdderss=${takerAddress}`;
    } else if (!takerAddress && sellAmount) {
      return `swap/v1/price?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}`;
    } else if (!takerAddress && buyAmount) {
      return `swap/v1/price?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${buyAmount}`;
    } else {
      throw new Error('Price Query not found');
    }
  }
  static findSwapQuoteApiQuery(
    sellToken: string,
    buyToken: string,
    sellAmount?: string,
    buyAmount?: string,
    slippagePercentage?: string,
    takerAddress?: string,
  ) {
    if (takerAddress && buyAmount) {
      return `swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${buyAmount}&takerAdderss=${takerAddress}${
        slippagePercentage ? '&slippagePercentage=' + slippagePercentage : ''
      }`;
    } else if (takerAddress && sellAmount) {
      return `swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}&takerAdderss=${takerAddress}${
        slippagePercentage ? '&slippagePercentage=' + slippagePercentage : ''
      }`;
    } else if (!takerAddress && sellAmount) {
      return `swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}${
        slippagePercentage ? '&slippagePercentage=' + slippagePercentage : ''
      }`;
    } else if (!takerAddress && buyAmount) {
      return `swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${buyAmount}${
        slippagePercentage ? '&slippagePercentage=' + slippagePercentage : ''
      }`;
    } else {
      throw new Error('Price Query not found');
    }
  }
  static findSwapExchangeProxyAddress(chainId: number) {
    switch (chainId) {
      case 1:
        return '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
      case 5:
        return '0xf91bb752490473b8342a3e964e855b9f9a2a668e';
      case 42161:
        return '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
      case 43114:
        return '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
      case 8453:
        return '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
      case 56:
        return '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
      case 42220:
        return '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
      case 250:
        return '0xdef189deaef76e379df891899eb5a00a94cbc250';
      case 10:
        return '0xdef1abe32c034e558cdd535791643c58a13acc10';
      case 137:
        return '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
      case 80001:
        return '0xf471d32cb40837bf24529fcf17418fc1a4807626';
    }
  }
}
export interface ISwapPriceResponse {
  chainId: number;
  price: string;
  estimatedPriceImpact: string;
  value: string;
  gasPrice: string;
  grossBuyAmount: string;
  gas: string;
  estimatedGas: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  buyAmount: string;
  sellTokenAddress: string;
  sellAmount: string;
  allowanceTarget: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  expectedSlippage: string | null;
}

export interface ISwapQuoteResponse {
  chainId: number;
  price: string;
  guaranteedPrice: string;
  estimatedPriceImpact: string;
  to: string;
  from: string;
  data: `0x${string}`;
  value: string;
  gas: string;
  estimatedGas: string;
  gasPrice: string;
  grossBuyAmount: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  buyAmount: string;
  sellAmount: string;
  sources: SwapSource[];
  orders: SwapOrder[];
  allowanceTarget: string;
  decodedUniqueId: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  expectedSlippage: string | null;
}
interface SwapSource {
  name: string;
  proportion: string;
}

interface SwapOrder {
  makerToken: string;
  takerToken: string;
  makerAmount: string;
  takerAmount: string;
  fillData: {
    tokenAddressPath: string[];
    router: string;
  };
  source: string;
  sourcePathId: string;
  type: number;
}
