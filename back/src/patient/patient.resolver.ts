import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { PaginatePatientOutput } from './dto/patient.output';
import { PaginationInput } from '../shared/shared.input';
import { PaginatePatientSalesOutput } from '../sale/dto/sale.output';
import { PaginatePatientSalesInput } from '../sale/dto/sale.input';
import { SaleService } from '../sale/sale.service';
import { CreatePatientInput } from './dto/patient.input';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(
    private patientService: PatientService,
    private saleService: SaleService,
  ) {}

  @Query(() => [Patient])
  async findSuggestedPatients(
    @Args('keyword') keyword: string,
  ): Promise<Patient[]> {
    return this.patientService.findSuggestions(keyword);
  }

  @Mutation(() => Patient)
  async updatePatient(@Args('input') input: CreatePatientInput) {
    const patient = await this.patientService.findOneById(input.id);
    Object.assign(patient, input);
    return this.patientService.save(patient);
  }

  @Mutation(() => Patient)
  removePatient(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.remove(id);
  }
  @Query(() => PaginatePatientOutput)
  async paginatePatients(@Args('input') input: PaginationInput) {
    return this.patientService.paginate(input);
  }
  @Query(() => PaginatePatientSalesOutput)
  async paginatePatientSales(@Args('input') input: PaginatePatientSalesInput) {
    return this.saleService.paginateByPatient(input);
  }
}
