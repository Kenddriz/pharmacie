import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { UpdatePatientInput } from './dto/update-patient.input';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Query(() => [Patient])
  async findSuggestedPatients(
    @Args('keyword') keyword: string,
  ): Promise<Patient[]> {
    return this.patientService.findSuggestions(keyword);
  }

  @Mutation(() => Patient)
  async updatePatient(@Args('input') input: UpdatePatientInput) {
    const patient = await this.patientService.findOneById(input.id);
    Object.assign(patient, input);
    return this.patientService.save(patient);
  }

  @Mutation(() => Patient)
  removePatient(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.remove(id);
  }
}
