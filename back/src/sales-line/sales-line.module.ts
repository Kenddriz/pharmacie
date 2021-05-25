import { Module } from '@nestjs/common';
import { SalesLineService } from './sales-line.service';
import { SalesLineResolver } from './sales-line.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesLine } from './sales-line.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([SalesLine])],
  providers: [SalesLineResolver, SalesLineService],
})
export class SalesLineModule {}
