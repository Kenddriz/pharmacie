import { Global, Module } from '@nestjs/common';
import { PackagingService } from './packaging.service';
import { PackageResolver } from './package.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packaging } from './packaging.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Packaging])],
  providers: [PackageResolver, PackagingService],
  exports: [PackagingService],
})
export class PackagingModule {}
