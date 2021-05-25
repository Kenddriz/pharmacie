import {Global, Module} from '@nestjs/common';
import { QuantityService } from './quantity.service';
import { QuantityResolver } from './quantity.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Quantity} from './quantity.entity';
import { QuantityFieldResolver } from './resolvers/quantity.field-resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Quantity])],
  providers: [QuantityResolver, QuantityFieldResolver, QuantityService],
  exports: [QuantityService],
})
export class QuantityModule {}
