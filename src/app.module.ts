import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ConfigModule } from '@nestjs/config';
import { EvmModule } from './evm/evm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      // for schema.gql file generation
      // autoSchemaFile: 'src/schema.gql',

      // for deploying to vercel
      autoSchemaFile: true,
    }),
    EvmModule,
  ],
})
export class AppModule {}
