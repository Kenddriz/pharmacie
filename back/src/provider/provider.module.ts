import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderResolver } from './provider.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import {ContactModule} from '../contact/contact.module';
import {ContactTypeModule} from '../contact-type/contact-type.module';
import {ProviderFieldResolver} from './provider.field.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Provider]), ContactModule, ContactTypeModule],
  providers: [ProviderResolver, ProviderFieldResolver, ProviderService],
})
export class ProviderModule {}
