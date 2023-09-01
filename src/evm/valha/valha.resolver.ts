import { Resolver, Query, Args } from '@nestjs/graphql';
import { ValhaService } from './valha.service';
import { ValhaIneractionData, ValhaZapInput } from './entities/valha.entity';

@Resolver(() => ValhaIneractionData)
export class ValhaResolver {
  constructor(private readonly valhaService: ValhaService) {}
  @Query(() => ValhaIneractionData, { name: 'valhaZapTransaction' })
  async zap(@Args('valhaZapInput') valhaZapInput: ValhaZapInput) {
    return this.valhaService.zap(valhaZapInput);
  }
}
