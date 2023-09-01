import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValhaZapInput } from './entities/valha.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ValhaService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async zap(valhaZapInput: ValhaZapInput) {
    const url = `https://api.valha.xyz/v0/${this.valhaChainFrom(
      valhaZapInput.chainId,
    )}/pools/${valhaZapInput.poolAddress}/zap/${valhaZapInput.action}`;
    const header = {
      accept: 'application/json',
      Authorization: `Bearer ${this.configService.get<string>(
        'VALHA_API_KEY',
      )}`,
    };
    const data = {
      user: valhaZapInput.walletAddress,
      amount: valhaZapInput.inputAmount,
      disable_check: valhaZapInput.disableCheck,
      maximum_approval: false,
      use_valha_router: valhaZapInput.useValhaRouter,
      swap: {
        provider: valhaZapInput.swapProvider,
        token: valhaZapInput.swapToken,
      },
    };
    const responseData = (
      await lastValueFrom(
        this.httpService.post(url, data, {
          headers: header,
        }),
      )
    ).data.data;
    return responseData;
  }

  valhaChainFrom(chainId: number): string {
    switch (chainId) {
      case 10:
        return 'optimism';
      case 42161:
        return 'arbitrum';
      default:
        return 'optimism';
    }
  }
}
