import { config } from 'dotenv';
import { join } from 'path';
import { getConnectionOptions } from 'typeorm';

export const loadEnvVariables = async () => {
  console.log('Chargement des paramètres de connexion ...');
  config();
};
export const connexionOptions = async () => {
  return Object.assign(await getConnectionOptions(), {
    entities: [
      `${join(__dirname, '..')}${process.env.TYPEORM_ENTITIES.replace(
        /src/gi,
        '',
      )}`,
    ],
    synchronize: process.env.NODE_ENV === 'development',
    migrations: [],
  });
};
