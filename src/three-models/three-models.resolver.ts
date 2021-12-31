import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/users/users.decorator';
import { SaveThreeModelInput, SaveThreeModelOutput } from './dtos/saveThreeModel.dto';
import { ThreeModelsService } from './three-models.service';

@Resolver()
export class ThreeModelsResolver {

    constructor(
        private threeModelService: ThreeModelsService
    ) {}

    @Mutation(returns => SaveThreeModelOutput)
    @UseGuards(GqlAuthGuard)
    async saveThreeModel(@Args('input') saveThreeModelInput:SaveThreeModelInput, @CurrentUser() owner):Promise<SaveThreeModelOutput> {
        return await this.threeModelService.save(saveThreeModelInput, owner)
    }
}
