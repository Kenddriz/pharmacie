import { Resolver, Mutation, Args, ResolveField, Root } from '@nestjs/graphql';
import { PrescriptionService } from './prescription.service';
import { Prescription } from './prescription.entity';
import { UpdatePrescriptionInput } from './dto/update-prescription.input';
import { PatientService } from '../patient/patient.service';
import { Patient } from '../patient/patient.entity';
import {
  CreatePrescriptionInput,
  DeletePrescriptionInput,
} from './dto/prescription.input';
import { SaleService } from '../sale/sale.service';
import { Sale } from '../sale/sale.entity';

@Resolver(() => Prescription)
export class PrescriptionResolver {
  constructor(
    private prescriptionService: PrescriptionService,
    private patientService: PatientService,
    private saleService: SaleService,
  ) {}

  @Mutation(() => Sale)
  async createPrescription(
    @Args('input')
    input: CreatePrescriptionInput,
  ): Promise<Sale> {
    const { saleId, patient, ...presInput } = input;
    const sale = await this.saleService.findOneById(saleId);

    const pt =
      patient.id > 0
        ? await this.patientService.findOneById(patient.id)
        : new Patient();
    Object.assign(pt, patient);

    const prescription = new Prescription();
    prescription.sale = sale;
    Object.assign(prescription, presInput);
    prescription.patient = pt;
    await this.prescriptionService.save(prescription);
    return sale;
  }
  @Mutation(() => Prescription)
  async updatePrescription(
    @Args('input')
    input: UpdatePrescriptionInput,
  ): Promise<Prescription> {
    const { id, patient, ...presInput } = input;
    const pt = await this.patientService.findOneById(patient.id);
    Object.assign(pt, patient);
    this.patientService.save(pt);
    const prescription = await this.prescriptionService.findOneById(id);
    Object.assign(prescription, presInput);
    return this.prescriptionService.save(prescription);
  }

  @Mutation(() => Sale)
  async deletePrescription(@Args('input') input: DeletePrescriptionInput) {
    await this.prescriptionService.remove(input.id);
    return this.saleService.findOneById(input.saleId);
  }
  @ResolveField(() => Patient)
  async patient(@Root() prescription: Prescription): Promise<Patient> {
    return this.patientService.findOneById(prescription.patientId);
  }
}
