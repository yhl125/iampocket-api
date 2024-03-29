import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import {
  CovalentBalancesResponse,
  CovalentTokenItem,
  CovalentUtils,
} from 'src/utils/covalent.utils';
import { QuoteCurrency, Token, TokenAssetData } from './entities/token.entity';

@Injectable()
export class BalanceService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findTokens(
    address: string,
    chainId: number,
    quoteCurrency: QuoteCurrency,
  ) {
    if (!address) {
      return {
        totalAmount: 0,
        tokenList: [],
      };
    }
    const chainName = CovalentUtils.chainNameFrom(chainId);
    const url = `https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_v2/?quote-currency=${
      QuoteCurrency[quoteCurrency]
    }&no-spam=true&key=${this.configService.get<string>('COVALENT_API_KEY')}`;
    const data = (await lastValueFrom(this.httpService.get(url))).data.data;
    return this.covalentDataToTokens(data);
  }
  async findTokensByChainIds(
    address: string,
    chainIds: number[],
    quoteCurrency: QuoteCurrency,
  ) {
    let totalQuote = 0;
    const tokenList = [];
    const tokenAsset = chainIds.map((chainId) => {
      return this.findTokens(address, chainId, quoteCurrency);
    });
    (await Promise.all(tokenAsset)).forEach((value) => {
      totalQuote += value.totalAmount;
      tokenList.push(...value.tokenList);
    });
    const tokenAssetData: TokenAssetData = {
      totalQuote: totalQuote,
      tokenList: tokenList,
    };
    return tokenAssetData;
  }
  covalentDataToTokens(data: CovalentBalancesResponse) {
    const tokens: Token[] = [];
    let totalAmount: number = 0;
    for (const item of data.items) {
      if (item.balance === '0') {
        continue;
      } else {
        totalAmount += item.quote;
        tokens.push(this.covalentItemToToken(item, data.chain_id));
      }
    }
    const tokenAssetData = {
      totalAmount: totalAmount,
      tokenList: tokens,
    };
    return tokenAssetData;
  }

  covalentItemToToken(item: CovalentTokenItem, chainId: number) {
    const token: Token = {
      chainId: chainId,
      address: item.contract_address,
      name: item.contract_name,
      symbol: item.contract_ticker_symbol,
      decimals: item.contract_decimals,
      logoUrl: item.logo_url,
      nativeToken: item.native_token,
      type: item.type,
      balance: item.balance,
      balance24hAgo: item.balance_24h,
      quote: item.quote,
      prettyQuote: item.pretty_quote,
      quoteRate: item.quote_rate,
      quoteRate24hAgo: item.quote_rate_24h,
    };

    return token;
  }
}
