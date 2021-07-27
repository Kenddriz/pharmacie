import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { CommandLine } from '../command-line.entity';
import { UnitService } from '../../unit/unit.service';
import { FormService } from '../../form/form.service';
import { Unit } from '../../unit/unit.entity';
import { Form } from '../../form/form.entity';

@Resolver(() => CommandLine)
export class CommandLineFieldResolver {
  constructor(
    private unitService: UnitService,
    private formService: FormService,
  ) {}
  @ResolveField(() => Unit)
  unit(@Root() command: CommandLine) {
    return this.unitService.findOneById(command.unitId);
  }
  @ResolveField(() => Form)
  form(@Root() command: CommandLine) {
    return this.formService.findOneById(command.formId);
  }
}
