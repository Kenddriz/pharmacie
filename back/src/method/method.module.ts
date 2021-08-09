import { Module } from '@nestjs/common';
import { MethodService } from './method.service';
import { MethodResolver } from './method.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Method } from './method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Method])],
  providers: [MethodResolver, MethodService],
})
export class MethodModule {}
