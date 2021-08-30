import { Injectable } from '@nestjs/common';
import { CreateDeliveryInput } from './dto/create-delivery.input';
import { UpdateDeliveryInput } from './dto/update-delivery.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './delivery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}
  create(createDeliveryInput: CreateDeliveryInput) {
    return 'This action adds a new delivery';
  }

  findAll() {
    return `This action returns all delivery`;
  }

  async findOneById(id: number): Promise<Delivery> {
    return this.deliveryRepository.findOne(id);
  }

  async findByCommandId(commandId: number): Promise<Delivery> {
    return this.deliveryRepository
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
