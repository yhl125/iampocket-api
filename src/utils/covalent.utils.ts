import { Injectable } from '@nestjs/common';

@Injectable()
export class CovalentUtils {
  static chainNameFrom(chainId: number): string {
    switch (chainId) {
      case 1:
        return 'eth-mainnet';
      case 5:
        return 'eth-goerli';
      case 56:
        return 'bsc-mainnet';
      case 137:
        return 'matic-mainnet';
      case 80001:
        return 'matic-mumbai';
      case 42161:
        return 'arbitrum-mainnet';
      case 421613:
        return 'arbitrum-goerli';
      case 10:
        return 'optimism-mainnet';
      case 420:
        return 'optimism-goerli';
      case 8453:
        return 'base-mainnet';
      case 84531:
        return 'base-testnet';
      default:
        return 'eth-mainnet';
    }
  }
}

export interface CovalentBalancesResponse {
  address: string;
  updated_at: Date;
  chain_id: number;
  chain_name: string;
  items: CovalentTokenItem[];
}

export interface CovalentTokenItem {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  logo_url: string;
  last_transferred_at?: Date;
  native_token: boolean;
  type: string;
  balance: string;
  balance_24h?: string;
  quote_rate?: number;
  quote_rate_24h?: number;
  quote?: number;
  pretty_quote?: string;
  quote_24h: number;
  pretty_quote_24h?: string;
  // nft_data?: NftData[];
  is_spam?: boolean;
}

export interface CovalentNftBalanceResponse {
  address: string;
  updated_at: Date;
  items: CovalentNftItem[];
}

export interface CovalentNftItem {
  contract_name?: string;
  contract_ticker_symbol?: string;
  contract_address: string;
  supports_erc: string[];
  is_spam: boolean;
  balance: number;
  balance24h: number;
  type: string;
  nft_data: NftData[];
}

interface NftData {
  token_id: string;
  token_url?: string;
  original_owner?: string;
  external_data?: ExternalData;
}

interface ExternalData {
  name?: string;
  description?: string;
  image?: string;
  image_256?: string;
  image_512?: string;
  image_1024?: string;
  animation_url?: string;
  external_url?: string;
  attributes: Attribute[];
}

interface Attribute {
  trait_type: string;
  value: string;
}
