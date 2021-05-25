import { Module } from '@nestjs/common';
import { ContactTypeService } from './contact-type.service';
import { ContactTypeResolver } from './contact-type.resolver';
import {ContactType} from "./contact-type.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ContactType])],
  providers: [ContactTypeResolver, ContactTypeService],
  exports: [ContactTypeService],
})
export class ContactTypeModule {}
