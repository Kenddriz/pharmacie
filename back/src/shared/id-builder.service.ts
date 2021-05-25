import { getRepository } from 'typeorm';

export const uniqId = async (repo: string): Promise<number> => {
  let id = 1,
    lastId = 0;

  const repoLower = repo.toLowerCase(); /**Table alias, example: gateways*/

  const all = await getRepository(repo)
    .createQueryBuilder(repoLower)
    .select(repoLower + '.id')
    .withDeleted()
    .orderBy(repoLower + '.id', 'ASC')
    .getRawMany();

  Object.values(all).forEach((val: Record<string, number>) => {
    lastId = Object.values(val)[0];
    if (lastId != id) return false; /**break loop**/
    id++;
  });
  /**Make sure that last id !=id, in the case of 1,2,3,...completed number*/
  return id != lastId ? id : ++id;
};
