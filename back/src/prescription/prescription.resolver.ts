import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { PrescriptionService } from './prescription.service';
import { Prescription } from './prescription.entity';
import { UpdatePrescriptionInput } from './dto/update-prescription.input';
import { PatientService } from '../patient/patient.service';
import { Patient } from '../patient/patient.entity';

@Resolver(() => Prescription)
export class PrescriptionResolver {
  constructor(
    private prescriptionService: PrescriptionService,
    private patientService: PatientService,
  ) {}

  @Mutation(() => Prescription)
  @Query(() => [Prescription], { name: 'prescription' })
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Mutation(() => Prescription)
  async updatePrescription(
    @Args('input')
    input: UpdatePrescriptionInput,
  ) {
    const prescription = await this.prescriptionService.findOneById(input.id);
    Object.assign(prescription, input);
    return this.prescriptionService.save(prescription);
  }

  @Mutation(() => Prescription)
  removePrescription(@Args('id', { type: () => Int }) id: number) {
    return this.prescriptionService.remove(id);
  }
  @ResolveField(() => Patient)
  async patient(@Root() prescription: Prescription): Promise<Patient> {
    return this.patientService.findOneById(prescription.patientId);
  }
}
