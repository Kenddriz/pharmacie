import { Global, Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderResolver } from './provider.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { ContactModule } from '../contact/contact.module';
import { ContactTypeModule } from '../contact-type/contact-type.module';
import { ProviderFieldResolver } from './provider.field.resolver';
import { CommandModule } from '../command/command.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    ContactModule,
    ContactTypeModule,
    CommandModule,
  ],
  providers: [ProviderResolver, ProviderFieldResolver, ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
