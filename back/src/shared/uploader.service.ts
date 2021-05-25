import { UnauthorizedException } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Upload } from './shared.input';

type FileParams = {
  filename: string;
  mimetype: string;
};

export const upload = async (
  file: Upload,
  dossier: string,
  id: number,
): Promise<FileParams> => {
  const { createReadStream, filename, mimetype } = await file;

  let m_filename =
    filename.lastIndexOf('.') > 20 ? filename.substr(20) : filename;
  m_filename = id + '-' + m_filename;

  const path = __dirname + `/../../../public/${dossier}`;
  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  const uploaded = await new Promise((resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`${path}/${m_filename}`))
      .on('finish', () => resolve(true))
      .on('error', () => reject(false)),
  );
  if (!uploaded)
    throw new UnauthorizedException(`upload du fichier ${filename} a echoué`);

  return { filename: m_filename, mimetype };
};
