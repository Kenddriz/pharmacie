import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AssuredLineService } from './assured-line.service';
import { AssuredLine } from './assured-line.entity';
import { CreateAssuredLineInput } from './dto/create-assured-line.input';
import { UpdateAssuredLineInput } from './dto/update-assured-line.input';

@Resolver(() => AssuredLine)
export class AssuredLineResolver {
  constructor(private readonly assuredLineService: AssuredLineService) {}

  @Mutation(() => AssuredLine)
  createAssuredLine(@Args('createAssuredLineInput') createAssuredLineInput: CreateAssuredLineInput) {
    return this.assuredLineService.create(createAssuredLineInput);
  }

  @Query(() => [AssuredLine], { name: 'assuredLine' })
  findAll() {
    return this.assuredLineService.findAll();
  }

  @Query(() => AssuredLine, { name: 'assuredLine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.assuredLineService.findOne(id);
  }

  @Mutation(() => AssuredLine)
  updateAssuredLine(@Args('updateAssuredLineInput') updateAssuredLineInput: UpdateAssuredLineInput) {
    return this.assuredLineService.update(updateAssuredLineInput.id, updateAssuredLineInput);
  }

  @Mutation(() => AssuredLine)
  removeAssuredLine(@Args('id', { type: () => Int }) id: number) {
    return this.assuredLineService.remove(id);
  }
}
