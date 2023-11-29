import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field()
  chainId: number;
  @Field()
  address: string;
  @Field()
  name: string;
  @Field()
  symbol: string;
  @Field()
  decimals: number;
  @Field()
  logoUrl: string;
  @Field()
  nativeToken: boolean;
  @Field()
  // 'cryptocurrency' | 'dust'
  type: string;
  @Field()
  balance: string;
  @Field({ nullable: true })
  balance24hAgo?: string;
  @Field({ nullable: true })
  quote?: number;
  @Field({ nullable: true })
  prettyQuote?: string;
  @Field({ nullable: true })
  quoteRate?: number;
  @Field({ nullable: true })
  quoteRate24hAgo?: number;
}
@ObjectType()
export class TokenAssetData {
  @Field()
  totalQuote: number;
  @Field(() => [Token])
  tokenList: Token[];
}
export enum QuoteCurrency {
  USD,
  CAD,
  EUR,
  SGD,
  INR,
  JPY,
  VND,
  CNY,
  KRW,
  RUB,
  TRY,
  NGN,
  ARS,
  AUD,
  CHF,
  GBP,
}

registerEnumType(QuoteCurrency, {
  name: 'QuoteCurrency',
});
