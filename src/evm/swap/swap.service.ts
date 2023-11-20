import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { PriceResponse, QuoteResponse, SwapUtils } from 'src/utils/swap.utils';
import { SwapPrice, SwapQuote } from './entities/swap.entities';

@Injectable()
export class SwapService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async findSwapQuote(
    chainId: number,
    sellToken: string,
    buyToken: string,
    sellAmount?: string,
    buyAmount?: string,
    slippagePercentage?: string,
    takerAddress?: `0x${string}`,
  ) {
    if (!sellAmount && !buyAmount)
      throw new Error('Either sellAmount or buyAmount is required');
    else if (sellAmount && buyAmount)
      throw new Error('Either sellAmount or buyAmount is required');
    return this.findQuote(
      chainId,
      sellToken,
      buyToken,
      sellAmount,
      buyAmount,
      slippagePercentage,
      takerAddress,
    );
  }
  async findSwapPrice(
    chainId: number,
    sellToken: string,
    buyToken: string,
    sellAmount?: string,
    buyAmount?: string,
    takerAddress?: `0x${string}`,
  ) {
    if (!sellAmount && !buyAmount)
      throw new Error('Either sellAmount or buyAmount is required');
    else if (sellAmount && buyAmount)
      throw new Error('Either sellAmount or buyAmount is required');
    return this.findPrice(
      chainId,
      sellToken,
      buyToken,
      sellAmount,
      buyAmount,
      takerAddress,
    );
  }
  async findPrice(
    chainId: number,
    sellToken: string,
    buyToken: string,
    sellAmount?: string,
    buyAmount?: string,
    takerAddress?: `0x${string}`,
  ) {
    const priceApiUrl =
      SwapUtils.findSwapApiUrl(chainId) +
      SwapUtils.findSwapPriceApiQuery(
        sellToken,
        buyToken,
        sellAmount,
        buyAmount,
        takerAddress,
      );
    const data = (
      await lastValueFrom(
        this.httpService.get(priceApiUrl, {
          headers: {
            '0x-api-key': this.configService.get<string>('0XSWAP_API_KEY'),
          },
        }),
      )
    ).data;
    return this.priceResponseToPriceData(data);
  }
  async findQuote(
    chainId: number,
    sellToken: string,
    buyToken: string,
    sellAmount?: string,
    buyAmount?: string,
    slippagePercentage?: string,
    takerAddress?: `0x${string}`,
  ) {
    const quoteApiUrl =
      SwapUtils.findSwapApiUrl(chainId) +
      SwapUtils.findSwapQuoteApiQuery(
        sellToken,
        buyToken,
        sellAmount,
        buyAmount,
        slippagePercentage,
        takerAddress,
      );
    const data = (
      await lastValueFrom(
        this.httpService.get(quoteApiUrl, {
          headers: {
            '0x-api-key': this.configService.get<string>('0XSWAP_API_KEY'),
          },
        }),
      )
    ).data;
    return this.quoteResponseToQuoteData(data);
  }
  priceResponseToPriceData(priceResponse: PriceResponse) {
    const price: SwapPrice = {
      chainid: priceResponse.chainId,
      price: priceResponse.price,
      value: priceResponse.value,
      buyTokenAddress: priceResponse.buyTokenAddress,
      buyAmount: priceResponse.buyAmount,
      sellTokenAddress: priceResponse.sellTokenAddress,
      sellAmount: priceResponse.sellAmount,
      gas: priceResponse.gas,
      AllownaceTarget: priceResponse.allowanceTarget,
    };
    return price;
  }
  quoteResponseToQuoteData(quoteResponse: QuoteResponse) {
    const quote: SwapQuote = {
      chainid: quoteResponse.chainId,
      price: quoteResponse.price,
      guaranteedPrice: quoteResponse.guaranteedPrice,
      to: quoteResponse.to,
      data: quoteResponse.data,
      value: quoteResponse.value,
      expectedSlippage: quoteResponse.expectedSlippage,
      buyTokenAddress: quoteResponse.buyTokenAddress,
      buyAmount: quoteResponse.buyAmount,
      sellTokenAddress: quoteResponse.sellTokenAddress,
      sellAmount: quoteResponse.sellAmount,
      AllownaceTarget: quoteResponse.allowanceTarget,
      sources: [...quoteResponse.sources],
      orders: [...quoteResponse.orders],
    };
    return quote;
  }
}
