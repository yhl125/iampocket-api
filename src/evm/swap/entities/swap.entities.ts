import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Quote {
  @Field(() => Int)
  chainid: number;
  @Field()
  price: string;
  @Field()
  guaranteedPrice: string;
  @Field()
  to: string;
  @Field()
  data: string;
  @Field()
  value: string;
  @Field({ nullable: true })
  expectedSlippage?: string;
  @Field()
  buyTokenAddress: string;
  @Field()
  buyAmount: string;
  @Field()
  sellTokenAddress: string;
  @Field(() => String)
  sellAmount: string;
  @Field()
  AllownaceTarget: string;
}

@ObjectType()
export class Price {
  @Field(() => Int)
  chainid: number;
  @Field()
  price: string;
  @Field()
  value: string;
  @Field()
  buyTokenAddress: string;
  @Field()
  buyAmount: string;
  @Field()
  sellTokenAddress: string;
  @Field()
  sellAmount: string;
  @Field()
  gas: string;
  /**
   * For swaps with "ETH" as sellToken,
   * wrapping "ETH" to "WETH" or unwrapping "WETH" to "ETH" no allowance is needed,
   * a null address of 0x0000000000000000000000000000000000000000 is then returned instead.
   */
  @Field()
  AllownaceTarget: string;
}
