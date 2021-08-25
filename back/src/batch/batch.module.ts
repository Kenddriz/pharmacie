import { Global, Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchResolver } from './batch.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from './batch.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Batch])],
  providers: [BatchResolver, BatchService],
  exports: [BatchService],
})
export class BatchModule {}
