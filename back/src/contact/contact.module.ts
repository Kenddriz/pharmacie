import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './Contact.entity';
import { ContactResolver } from './contact.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactService, ContactResolver],
  exports: [ContactService],
})
export class ContactModule {}
