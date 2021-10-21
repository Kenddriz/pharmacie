import { NestFactory } from '@nestjs/core';
import { loadEnvVariables } from './configuration/connexionLoader';
import { graphqlUploadExpress } from 'graphql-upload';
import { NestExpressApplication } from '@nestjs/platform-express';
import { publicDir } from './utils';

loadEnvVariables().then(async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    require('./app.module').AppModule,
  );
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
  app.useStaticAssets(publicDir());
  // app.setGlobalPrefix('api');
  await app.listen(process.env.PORT, '0.0.0.0');
  console.log(
    'Connexion au serveur établie (http://localhost:' + process.env.PORT + ')',
  );
});
