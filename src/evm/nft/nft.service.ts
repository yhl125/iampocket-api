import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { lastValueFrom } from 'rxjs';
import {
  CovalentNftBalanceResponse,
  CovalentNftItem,
  CovalentUtils,
} from 'src/utils/covalent.utils';
import { Nft } from './entities/nft.entity';

@Injectable()
export class NftService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async findNfts(address: string, chainId: number) {
    const chainName = CovalentUtils.chainNameFrom(chainId);

    const url = `https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_nft/?no-spam=true&key=${this.configService.get<string>(
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
    return this.covalentDataToNfts(data);
  }

  covalentDataToNfts(data: CovalentNftBalanceResponse) {
    const nfts: Nft[] = [];

    for (const item of data.items) {
      nfts.push(...this.covalentItemToNfts(item));
    }

    return nfts;
  }

  covalentItemToNfts(item: CovalentNftItem) {
    const nfts: Nft[] = [];

    for (let index = 0; index < +item.balance; index++) {
      const nftData = item.nft_data[index];
      if (!nftData) {
        continue;
      }
      const nft: Nft = {
        address: item.contract_address,
        name: item.contract_name,
        symbol: item.contract_ticker_symbol,
        balance: item.balance,
        supportsErc: item.supports_erc,
        tokenId: nftData.token_id,
        nftName: nftData.external_data ? nftData.external_data.name : undefined,
        description: nftData.external_data
          ? nftData.external_data.description
          : undefined,
        image: nftData.external_data ? nftData.external_data.image : undefined,
        animationUrl: nftData.external_data
          ? nftData.external_data.animation_url
          : undefined,
        attributes: nftData.external_data
          ? nftData.external_data.attributes
          : undefined,
      };
      nfts.push(nft);
    }
    return nfts;
  }
}
