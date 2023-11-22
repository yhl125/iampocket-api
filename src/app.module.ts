import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ConfigModule } from '@nestjs/config';
import { EvmModule } from './evm/evm.module';
import { AppController } from './app.controller';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: 'src/schema.gql',
      resolvers: { JSON: GraphQLJSON },
    }),
    EvmModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
