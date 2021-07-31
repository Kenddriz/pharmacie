import { Global, Module } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureResolver } from './resolvers/measure.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from './measure.entity';
import { MeasureFieldResolver } from './resolvers/measure.field-resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Measure])],
  providers: [MeasureResolver, MeasureService, MeasureFieldResolver],
  exports: [MeasureService],
})
export class MeasureModule {}
