import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
class Source {
  @Field()
  name: string;
  @Field()
  proportion: string;
}
@ObjectType()
class FillData {
  @Field(() => [String])
  tokenAddressPath: string[];
  @Field()
  router: string;
}
@ObjectType()
class Order {
  @Field()
  makerToken: string;
  @Field()
  takerToken: string;
  @Field()
  makerAmount: string;
  @Field()
  takerAmount: string;
  @Field(() => FillData)
  fillData: FillData;
  @Field()
  source: string;
  @Field()
  sourcePathId: string;
  /**
   * Bridge = 0, Limit = 1, Rfq = 2, Otc = 3.
   * Bridge type means the order is executed on a DEX (aka AMMs).
   * Limit corresponds to LimitOrder. Rfq corresponds to RfqOrder.
   * Otc corresponds to OtcOrder. The "Rfq" type is deprecated.
   */
  @Field(() => Int)
  type: number;
}
@ObjectType()
export class SwapQuote {
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
  @Field(() => [Source])
  sources: Source[];
  @Field(() => [Order])
  orders: Order[];
  @Field()
  AllownaceTarget: string;
}

@ObjectType()
export class SwapPrice {
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
