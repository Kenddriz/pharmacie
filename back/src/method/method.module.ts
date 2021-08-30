import { Global, Module } from '@nestjs/common';
import { MethodService } from './method.service';
import { MethodResolver } from './method.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Method } from './method.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Method])],
  providers: [MethodResolver, MethodService],
  exports: [MethodService],
})
export class MethodModule {}
