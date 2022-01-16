import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/users/users.decorator';
import {
  GetThreeModelsInput,
  GetThreeModelsOutput,
} from './dtos/getThreeModels.dto';
import {
  SaveThreeModelInput,
  SaveThreeModelOutput,
} from './dtos/saveThreeModel.dto';
import { UpdateUrlsInput, UpdateUrlsOutput } from './dtos/updateUrls.dto';
import { ThreeModelsService } from './three-models.service';

@Resolver()
export class ThreeModelsResolver {
  constructor(private threeModelService: ThreeModelsService) {}

  @Mutation((returns) => SaveThreeModelOutput)
  @UseGuards(GqlAuthGuard)
  async saveThreeModels(
    @Args('input') saveThreeModelInput: SaveThreeModelInput,
    @CurrentUser() owner,
  ): Promise<SaveThreeModelOutput> {
    return await this.threeModelService.save(saveThreeModelInput, owner);
  }

  @Query((returns) => GetThreeModelsOutput)
  async getThreeModels(
    @Args('input') getThreeModelsInput: GetThreeModelsInput,
  ): Promise<GetThreeModelsOutput> {
    return await this.threeModelService.getModels(getThreeModelsInput);
  }

  @Mutation((returns) => UpdateUrlsOutput)
  @UseGuards(GqlAuthGuard)
  async updateUrls(@Args('input') updateUrlsInput: UpdateUrlsInput, @CurrentUser() owner): Promise<UpdateUrlsOutput> {
    return await this.threeModelService.updateUrls(updateUrlsInput, owner)
  }
}
