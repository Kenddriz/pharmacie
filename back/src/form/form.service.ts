import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';

@Injectable()
export class FormService {
  constructor(@InjectRepository(Form) private repository: Repository<Form>) {}
  async save(form: Form): Promise<Form> {
    return this.repository.save(form);
  }

  async findAll(): Promise<Form[]> {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
