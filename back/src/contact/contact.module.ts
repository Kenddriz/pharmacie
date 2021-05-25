import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Contact} from './Contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactResolver, ContactService],
  exports: [ContactService],
})
export class ContactModule {}
