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
      default:
        return 'eth-mainnet';
    }
  }
}

export interface CovalentData {
  address: string;
  updated_at: Date;
  next_update_at: Date;
  quote_currency: string;
  chain_id: number;
  chain_name: string;
  items: CovalentItem[];
}

export interface CovalentItem {
  contract_decimals?: number;
  contract_name?: string;
  contract_ticker_symbol?: string;
  contract_address: string;
  supports_erc: string[];
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
  nft_data?: NftData[];
  is_spam?: boolean;
}

interface NftData {
  token_id: string;
  token_balance?: string;
  token_url?: string;
  original_owner?: string;
  external_data?: ExternalData;
}

interface ExternalData {
  name?: string;
  description: string;
  image: string;
  image_256?: string;
  image_512?: string;
  image_1024?: string;
  animation_url: string;
  external_url?: string;
  attributes: Attribute[];
}

interface Attribute {
  trait_type: string;
  value: string;
}
