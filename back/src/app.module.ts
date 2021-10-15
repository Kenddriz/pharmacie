import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connexionOptions } from './configuration/connexionLoader';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProviderModule } from './provider/provider.module';
import { CommandModule } from './command/command.module';
import { CommandLineModule } from './command-line/command-line.module';
import { MedicineModule } from './medicine/medicine.module';
import { ArticleModule } from './article/article.module';
import { DosageModule } from './dosage/dosage.module';
import { PackagingModule } from './packaging/packaging.module';
import { StockMovementModule } from './stock-movement/stock-movement.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PaymentModule } from './payment/payment.module';
import { MethodModule } from './method/method.module';
import { BatchModule } from './batch/batch.module';
import { SaleModule } from './sale/sale.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { FormModule } from './form/form.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => await connexionOptions(),
    }),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      playground: process.env.NODE_ENV === 'development',
      installSubscriptionHandlers: true,
      uploads: false,
    }),
    UserModule,
    ProviderModule,
    CommandModule,
    CommandLineModule,
    MedicineModule,
    ArticleModule,
    DosageModule,
    PackagingModule,
    StockMovementModule,
    InvoiceModule,
    PaymentModule,
    MethodModule,
    BatchModule,
    SaleModule,
    PatientModule,
    AuthModule,
    PrescriptionModule,
    FormModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
