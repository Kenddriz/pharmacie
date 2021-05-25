import { Injectable } from '@nestjs/common';
import {ContactType} from './contact-type.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {ILike, Repository} from 'typeorm';

@Injectable()
export class ContactTypeService {
  constructor(
      @InjectRepository(ContactType)
      private contactTypeRepository: Repository<ContactType>
  ) {
  }
  async save(type: ContactType):Promise<ContactType> {
    return this.contactTypeRepository.save(type);
  }

  async findAll(): Promise<ContactType[]> {
    return this.contactTypeRepository.find();
  }

  async findOneById(id: number): Promise<ContactType> {
    return  this.contactTypeRepository.findOne(id);
  }

  async findOneByLabel(label: string): Promise<ContactType> {
    return  this.contactTypeRepository.findOne({ label: ILike(label) });
  }
}
