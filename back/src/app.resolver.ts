import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

@Resolver()
export class AppResolver {
  @Mutation(() => Number)
  async removeAllArchived(@Args('repo') repo: string): Promise<number> {
    const query = await getRepository(repo)
      .createQueryBuilder()
      .delete()
      .where('archivedAt IS NOT NULL')
      .execute();
    return query.affected;
  }
}
