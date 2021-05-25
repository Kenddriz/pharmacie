import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { SalesLineModule } from './sales-line/sales-line.module';
import { SaleModule } from './sale/sale.module';
import { MedicineTypeModule } from './medicine-type/medicine-type.module';
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
import { QuantityModule } from './quantity/quantity.module';
import { ContactModule } from './contact/contact.module';
import { ContactTypeModule } from './contact-type/contact-type.module';

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
    MedicineTypeModule,
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
    QuantityModule,
    ContactModule,
    ContactTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
