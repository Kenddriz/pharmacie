import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Contact } from './Contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}
  async save(type: Contact): Promise<Contact> {
    return this.contactRepository.save(type);
  }

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findOneById(id: number): Promise<Contact> {
    return this.contactRepository.findOne(id);
  }

  async findOneByLabel(label: string): Promise<Contact> {
    return this.contactRepository.findOne({ label: ILike(label) });
  }

  async findOneByProviderId(providerId: number): Promise<Contact[]> {
    return await this.contactRepository
      .createQueryBuilder('contact')
      .where('contact.providerId = :providerId', { providerId })
      .orderBy('contact.updated_at', 'DESC')
      .getMany();
  }
}
