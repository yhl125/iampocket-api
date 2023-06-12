import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class Attribute {
  @Field()
  trait_type: string;
  @Field()
  value: string;
}

@ObjectType()
export class Nft {
  @Field()
  address: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  symbol?: string;
  @Field(() => Int)
  balance: number;
  @Field(() => [String])
  supportsErc: string[];
  @Field()
  tokenId: string;
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
