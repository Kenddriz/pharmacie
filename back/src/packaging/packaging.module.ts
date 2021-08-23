import { Module } from '@nestjs/common';
import { PackagingService } from './packaging.service';
import { PackagingResolver } from './packaging.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packaging } from './packaging.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Packaging])],
  providers: [PackagingResolver, PackagingService],
  exports: [PackagingService],
})
export class PackagingModule {}
