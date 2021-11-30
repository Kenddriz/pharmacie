import { getRepository } from 'typeorm';
import { Upload } from './shared/shared.input';
import {
  access,
  constants,
  createWriteStream,
  existsSync,
  mkdirSync,
  unlinkSync,
} from 'fs';
import { UnauthorizedException } from '@nestjs/common';
import { join } from 'path';

type FileParams = {
  filename: string;
  mimetype: string;
};
export const publicDir = () => process.env.NODE_ENV === 'development' ?  join(__dirname, '..', 'public') : 'public/'

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

export const upload = async (
  file: Upload,
  dossier: string,
  id: number,
): Promise<FileParams> => {
  const { createReadStream, filename, mimetype } = await file;

  let m_filename = id + '-' + filename.substr(-20);

  const path = `${publicDir()}${dossier}/`;
  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  const uploaded = await new Promise((resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`${path}${m_filename}`))
      .on('finish', () => resolve(true))
      .on('error', () => reject(false)),
  );
  if (!uploaded)
    throw new UnauthorizedException(`upload du fichier ${filename} a echoué`);

  return { filename: m_filename, mimetype };
};
export const removeFile = (filename: string): boolean => {
  const path = publicDir() + filename;
  let removed = false;
  access(path, constants.F_OK, (err) => {
    if (!err) {
      try {
        unlinkSync(path);
        removed = true;
      } catch {}
    }
  });
  return removed;
};
