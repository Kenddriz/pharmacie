import { Module } from '@nestjs/common';
import { AssuredLineService } from './assured-line.service';
import { AssuredLineResolver } from './assured-line.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssuredLine } from './assured-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssuredLine])],
  providers: [AssuredLineResolver, AssuredLineService],
})
export class AssuredLineModule {}
