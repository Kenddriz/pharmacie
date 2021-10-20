import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DosageService } from './dosage.service';
import { Dosage } from './dosage.entity';
import { uniqId } from '../utils';
import { SaveDosageInput } from './types/dosage.input';

@Resolver(() => Dosage)
export class DosageResolver {
  constructor(private readonly service: DosageService) {}

  @Query(() => [Dosage])
  async dosages(): Promise<Dosage[]> {
    return await this.service.findAll();
  }
  @Mutation(() => Dosage)
  async saveDosage(@Args('input') input: SaveDosageInput): Promise<Dosage> {
    let dosage = new Dosage();
    const { id, ...res } = input;
    if (id !== 0) dosage = await this.service.findOneById(id);
    else dosage.id = await uniqId('Dosage');
    Object.assign(dosage, res);
    return await this.service.save(dosage);
  }

  @Mutation(() => Boolean)
  async deleteDosage(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.service.remove(id);
  }
  @Query(() => Int)
  async countDosages() {
    return this.service.count();
  }
}
