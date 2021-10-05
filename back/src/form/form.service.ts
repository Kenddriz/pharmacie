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
  async findOneByLabel(label: string): Promise<Form> {
    label = label.toLowerCase();
    return this.repository
      .createQueryBuilder()
      .where('LOWER(label) = :label', { label })
      .getOne();
  }
  async findOne(id: number) {
    return this.repository.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async count(): Promise<number> {
    return this.repository.count();
  }
}
