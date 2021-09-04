import { Injectable } from '@nestjs/common';
import { UpdateDeliveryInput } from './dto/update-delivery.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './delivery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private repository: Repository<Delivery>,
  ) {}
  async save(delivery: Delivery): Promise<Delivery> {
    return this.repository.save(delivery);
  }

  findAll() {
    return `This action returns all delivery`;
  }

  async findOneById(id: number): Promise<Delivery> {
    return this.repository.findOne(id);
  }

  async findByCommandId(commandId: number): Promise<Delivery> {
    return this.repository
      .createQueryBuilder('d')
      .where('d.commandId = :commandId', { commandId })
      .getOne();
  }

  update(id: number, updateDeliveryInput: UpdateDeliveryInput) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }
}
