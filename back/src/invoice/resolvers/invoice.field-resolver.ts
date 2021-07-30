import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Invoice } from '../invoice.entity';
import { PaymentService } from '../../payment/payment.service';
import { Payment } from '../../payment/payment.entity';
import { CommandService } from '../../command/command.service';
import { Command } from '../../command/command.entity';

@Resolver(() => Invoice)
export class InvoiceFieldResolver {
  constructor(
    private paymentService: PaymentService,
    private commandService: CommandService,
  ) {}
  @ResolveField(() => Payment)
  async payment(@Root() invoice: Invoice): Promise<Payment> {
    return await this.paymentService.findOneById(invoice.paymentId);
  }
  @ResolveField(() => Command)
  async command(@Root() invoice: Invoice): Promise<Command> {
    return await this.commandService.findOneById(invoice.commandId);
  }
}
