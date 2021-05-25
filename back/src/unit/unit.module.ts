import {Global, Module} from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitResolver } from './unit.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Unit} from './unit.entity';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([Unit])],
  providers: [UnitResolver, UnitService],
  exports: [ UnitService ]
})
export class UnitModule {}
