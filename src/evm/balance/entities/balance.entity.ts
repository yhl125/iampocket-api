import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field()
  address: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  symbol?: string;
  @Field({ nullable: true })
  decimals?: number;
  @Field()
  logoUrl: string;
  @Field()
  nativeToken: boolean;
  @Field()
  // 'cryptocurrency' | 'nft' | 'dust'
  type: string;
  @Field({ nullable: true })
  erc?: 'erc20' | 'erc721' | 'erc1155';
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
class Attribute {
  @Field()
  trait_type: string;
  @Field()
  value: string;
}

@ObjectType()
export class Nft extends Token {
  @Field()
  tokenId: string;
  @Field({ nullable: true })
  tokenBalance?: string;
  @Field({ nullable: true })
  nftName?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  image?: string;
  @Field({ nullable: true })
  animationUrl?: string;
  @Field(() => [Attribute], { nullable: 'itemsAndList' })
  attributes?: Attribute[];
}

@ObjectType()
export class Balance {
  @Field(() => Int)
  chainId: number;
  @Field()
  quoteCurrency: string;
  @Field(() => [Token], { nullable: 'items' })
  tokens: Token[];
  @Field(() => [Nft], { nullable: 'items' })
  nfts: Nft[];
}
