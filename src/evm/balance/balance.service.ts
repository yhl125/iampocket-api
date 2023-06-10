import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { lastValueFrom } from 'rxjs';
import {
  CovalentData,
  CovalentItem,
  CovalentUtils,
} from 'src/utils/covalent.utils';
import { Balance, Nft, Token } from './entities/balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findBy(address: string, chainId: number) {
    const chainName = CovalentUtils.chainNameFrom(chainId);

    const url = `https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_v2/?no-spam=true&key=${this.configService.get<string>(
      'COVALENT_API_KET',
    )}`;
    // console.log((await lastValueFrom(this.httpService.get(url))).data.data);
    const data = (await lastValueFrom(this.httpService.get(url))).data.data;
    return this.covalentDataToBalance(data);
  }

  async findWithNft(address: string, chainId: number) {
    const chainName = CovalentUtils.chainNameFrom(chainId);

    const url = `https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_v2/?nft=true&no-nft-fetch=false&no-spam=true&key=${this.configService.get<string>(
      'COVALENT_API_KET',
    )}`;
    const headers = new AxiosHeaders();
    headers.setAuthorization(
      'Basic ' +
        Buffer.from(
          this.configService.get<string>('COVALENT_API_KET'),
        ).toString('base64'),
    );

    const data = (await lastValueFrom(this.httpService.get(url))).data.data;
    return this.covalentDataToBalance(data);
  }

  covalentDataToBalance(data: CovalentData) {
    const balance: Balance = {
      chainId: data.chain_id,
      quoteCurrency: data.quote_currency,
      tokens: [],
      nfts: [],
    };

    for (const item of data.items) {
      if (item.balance === '0') {
        continue;
      } else if (item.type === 'nft') {
        balance.nfts.push(this.covalentNftItemToNft(item));
      } else {
        balance.tokens.push(this.covalentItemToToken(item));
      }
    }

    return balance;
  }

  covalentItemToToken(item: CovalentItem) {
    function erc(item: CovalentItem) {
      if (!item.supports_erc) {
        return undefined;
      } else if (item.supports_erc.includes('erc1155')) {
        return 'erc1155';
      } else if (item.supports_erc.includes('erc721')) {
        return 'erc721';
      } else if (item.supports_erc.includes('erc20')) {
        return 'erc20';
      } else {
        return undefined;
      }
    }

    const token: Token = {
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
      erc: erc(item),
      quoteRate: item.quote_rate,
      quoteRate24hAgo: item.quote_rate_24h,
    };

    return token;
  }

  covalentNftItemToNft(item: CovalentItem) {
    const token = this.covalentItemToToken(item);
    const nftData = item.nft_data[0];
    const externalData = nftData.external_data;
    const nft: Nft = {
      ...token,
      tokenId: nftData.token_id,
      tokenBalance: nftData.token_balance,
      nftName: externalData ? externalData.name : undefined,
      description: externalData ? externalData.description : undefined,
      image: externalData ? externalData.image : undefined,
      animationUrl: externalData ? externalData.animation_url : undefined,
      attributes: externalData ? externalData.attributes : undefined,
    };
    return nft;
  }
}
