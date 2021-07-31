import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { SalesLineModule } from './sales-line/sales-line.module';
import { SaleModule } from './sale/sale.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CommandModule } from './command/command.module';
import { ProviderModule } from './provider/provider.module';
import { PaymentModule } from './payment/payment.module';
import { MedicineModule } from './medicine/medicine.module';
import { GraphQLModule } from '@nestjs/graphql';
import { connexionOptions } from './configuration/connexionLoader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModeModule } from './payment-mode/payment-mode.module';
import { UnitModule } from './unit/unit.module';
import { CommandLineModule } from './command-line/command-line.module';
import { ContactModule } from './contact/contact.module';
import { ContactTypeModule } from './contact-type/contact-type.module';
import { MedicineFormModule } from './medicine-form/medicine-form.module';
import { FormModule } from './form/form.module';
import { MeasureModule } from './measure/measure.module';

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
    SalesLineModule,
    SaleModule,
    InvoiceModule,
    CommandModule,
    ProviderModule,
    PaymentModule,
    MedicineModule,
    UserModule,
    AuthModule,
    PaymentModeModule,
    UnitModule,
    CommandLineModule,
    ContactModule,
    ContactTypeModule,
    FormModule,
    MedicineFormModule,
    MeasureModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
