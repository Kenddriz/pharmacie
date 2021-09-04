import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { DeliveryService } from './delivery.service';
import { Delivery } from './delivery.entity';
import { CreateDeliveryInput } from './dto/delivery.input';
import { BatchService } from '../batch/batch.service';
import { StockMovementService } from '../stock-movement/stock-movement.service';
import { uniqId } from '../shared/id-builder.service';
import { Batch } from '../batch/batch.entity';
import { MedicineService } from '../medicine/medicine.service';
import { StockMovement } from '../stock-movement/stock-movement.entity';

@Resolver(() => Delivery)
export class DeliveryResolver {
  constructor(
    private deliveryService: DeliveryService,
    private btS: BatchService,
    private stmS: StockMovementService,
    private mdS: MedicineService,
  ) {}

  @Mutation(() => Delivery)
  async createDelivery(@Args('input') input: CreateDeliveryInput) {
    const delivery = new Delivery();
    delivery.id = await uniqId('Delivery');
    const medicines = await this.mdS.findByIds(
      input.forms.map((i) => i.medicineId),
    );

    for (const form of input.forms) {
      const medicine = medicines.find((m) => m.id === form.medicineId);
      let batch = await this.btS.findExisting(
        form.medicineId,
        form.expirationDate,
      );
      /**create batch if not exist yet*/
      if (!batch) {
        batch = new Batch();
        batch.id = await uniqId('Batch');
        batch.expirationDate = form.expirationDate;
        batch.medicine = medicine;
      }
      /**update current vat*/
      medicine.currentVat = form.vat;
      await this.mdS.save(medicine);
      batch.currentStock += form.quantity;
      /**stock movement creation*/
      const stMvt = new StockMovement();
      stMvt.batch = await this.btS.save(batch); /**save batch*/
      stMvt.delivery = delivery;
      stMvt.quantity = form.quantity;
      stMvt.price = form.price;
      stMvt.stock = batch.currentStock;
      stMvt.vat = form.vat;
      delivery.stockMovements.push(stMvt);
    }
    /***/
    return this.deliveryService.save(delivery);
  }

  @Query(() => [Delivery])
  findAll() {
    return this.deliveryService.findAll();
  }

  @Query(() => Delivery)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryService.findOneById(id);
  }

  @Mutation(() => Delivery)
  removeDelivery(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryService.remove(id);
  }
  /**field resolver*/
  @ResolveField(() => [StockMovement])
  async stockMovements(@Root() delivery: Delivery): Promise<StockMovement[]> {
    return this.stmS.findByDelivery(delivery.id);
  }
}
