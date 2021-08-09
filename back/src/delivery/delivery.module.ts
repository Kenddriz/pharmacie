import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryResolver } from './delivery.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  providers: [DeliveryResolver, DeliveryService],
})
export class DeliveryModule {}
