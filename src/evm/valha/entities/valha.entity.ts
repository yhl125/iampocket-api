import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class TransactionData {
  @Field()
  from: string;
  @Field()
  to: string;
  @Field()
  data: string;
  @Field()
  value: string;
  @Field()
  gasPrice: string;
}

@ObjectType()
export class ValhaIneractionData {
  @Field(() => [TransactionData])
  approveTx: [TransactionData];
  @Field(() => TransactionData)
  interactionTx: TransactionData;
}

@InputType()
export class ValhaZapInput {
  @Field(() => Int)
  chainId: number;
  @Field()
  walletAddress: string;
  @Field()
  poolAddress: string;
  @Field()
  action: string;
  @Field()
  inputAmount: number;
  @Field()
  disableCheck: boolean;
  @Field()
  useValhaRouter: boolean;
  @Field()
  swapProvider: string;
  @Field()
  swapToken: string;
}
