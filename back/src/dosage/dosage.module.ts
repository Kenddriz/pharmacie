import { Module } from '@nestjs/common';
import { DosageService } from './dosage.service';
import { DosageResolver } from './dosage.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dosage } from './dosage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dosage])],
  providers: [DosageResolver, DosageService],
  exports: [DosageService],
})
export class DosageModule {}
