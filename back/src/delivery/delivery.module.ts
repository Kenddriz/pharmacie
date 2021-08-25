import { Global, Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryResolver } from './delivery.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './delivery.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  providers: [DeliveryResolver, DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
