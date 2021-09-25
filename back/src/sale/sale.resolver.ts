import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { SaleService } from './sale.service';
import { Sale } from './sale.entity';
import { CreateSaleInput } from './dto/sale.input';
import { SalePagination } from './dto/sale.output';
import { PrescriptionService } from '../prescription/prescription.service';
import { Prescription } from '../prescription/prescription.entity';
import { BatchService } from '../batch/batch.service';
import { StockMovement } from '../stock-movement/stock-movement.entity';
import { Patient } from '../patient/patient.entity';
import { MedicineService } from '../medicine/medicine.service';
import { PaginationInput } from '../shared/shared.input';
import { StockMovementService } from '../stock-movement/stock-movement.service';
import { PatientService } from '../patient/patient.service';
import { uniqId } from '../shared/id-builder.service';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(
    private saleService: SaleService,
    private prescriptionService: PrescriptionService,
    private batchService: BatchService,
    private medicineService: MedicineService,
    private stmS: StockMovementService,
    private patientService: PatientService,
  ) {}

  @Mutation(() => Sale)
  async createSale(@Args('input') input: CreateSaleInput) {
    const sale = new Sale();
    sale.id = await uniqId('Sale');
    if (input?.prescription) {
      const { patient, ...prescriptionInput } = input.prescription;
      let pt: Patient;
      if (patient.id > 0)
        pt = await this.patientService.findOneById(patient.id);
      else {
        pt = new Patient();
        pt.id = await uniqId('Patient');
      }
      Object.assign(pt, patient);

      const prescription = new Prescription();
      prescription.id = await uniqId('Prescription');
      prescription.patient = pt;
      Object.assign(prescription, prescriptionInput);
      sale.prescription = prescription;
    }
    const batches = await this.batchService.findByIds(
      input.saleLines.map((i) => i.batchId),
    );
    sale.stockMovements = input.saleLines.map((saleLine) => {
      const stm = new StockMovement();
      const { batchId, ...stmInput } = saleLine;
      const batch = batches.find((b) => b.id === batchId);
      batch.medicine.currentVat = stmInput.vat;
      batch.medicine.currentSalePrice = stmInput.price;
      this.medicineService.save(batch.medicine);
      batch.currentStock -= stmInput.quantity;
      this.batchService.save(batch);
      stm.batch = batch;
      stm.stock = batch.currentStock;
      Object.assign(stm, stmInput);
      return stm;
    });
    return this.saleService.save(sale);
  }
  @Query(() => SalePagination)
  async paginateSales(
    @Args('paginationInput') input: PaginationInput,
  ): Promise<SalePagination> {
    return await this.saleService.paginate(input);
  }

  @Mutation(() => Boolean)
  async softRemoveSale(@Args('id', { type: () => Int }) id: number) {
    return this.saleService.softRemove(id);
  }
  @ResolveField(() => Prescription, { nullable: true })
  async prescription(@Root() sale: Sale): Promise<Prescription> {
    return this.prescriptionService.findBySale(sale.id);
  }
  /**field resolver*/
  @ResolveField(() => [StockMovement])
  async stockMovements(@Root() sale: Sale): Promise<StockMovement[]> {
    return this.stmS.findBySale(sale.id);
  }
}
