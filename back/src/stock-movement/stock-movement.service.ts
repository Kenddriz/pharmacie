import { Injectable } from '@nestjs/common';
import { StockMovementInput } from './dto/stock-movement.input';
import { UpdateStockMovementInput } from './dto/update-assured-line.input';
import { InjectRepository } from '@nestjs/typeorm';
import { StockMovement } from './stock-movement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockMovementService {
  constructor(
    @InjectRepository(StockMovement)
    private assuredLineRepository: Repository<StockMovement>,
  ) {}
  create(createStockMovementInput: StockMovementInput) {
    return 'This action adds a new assuredLine';
  }

  findAll() {
    return `This action returns all assuredLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assuredLine`;
  }

  update(id: number, updateStockMovementInput: UpdateStockMovementInput) {
    return `This action updates a #${id} assuredLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} assuredLine`;
  }
}
