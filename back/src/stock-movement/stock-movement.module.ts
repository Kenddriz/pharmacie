import { Global, Module } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { StockMovementResolver } from './stock-movement.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMovement } from './stock-movement.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([StockMovement])],
  providers: [StockMovementResolver, StockMovementService],
  exports: [StockMovementService],
})
export class StockMovementModule {}
