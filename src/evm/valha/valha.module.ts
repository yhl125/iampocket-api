import { Module } from '@nestjs/common';
import { ValhaService } from './valha.service';
import { ValhaResolver } from './valha.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ValhaResolver, ValhaService],
})
export class ValhaModule {}
