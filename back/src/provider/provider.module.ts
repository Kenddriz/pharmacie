import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderResolver } from './provider.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  providers: [ProviderResolver, ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
