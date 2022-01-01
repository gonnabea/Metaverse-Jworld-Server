import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/users/users.decorator';
import { CreateMiniHompiInput, CreateMiniHompiOutput } from './dtos/createMiniHompi.dto';
import { GetAllMiniHompiInput, GetAllMiniHompiOutput } from './dtos/getAllMiniHompis.dto';
import { GetMiniHompiInput, GetMiniHompiOutput } from './dtos/getMiniHompi.dto';
import { MiniHompiService } from './mini-hompi.service';

@Resolver()
export class MiniHompiResolver {

    constructor(
        private miniHompiService: MiniHompiService
    ) {}

    @Mutation(returns => CreateMiniHompiOutput)
    @UseGuards(GqlAuthGuard)
    async createMiniHompi(@Args('input') createMiniHompiInput:CreateMiniHompiInput, @CurrentUser() owner):Promise<CreateMiniHompiOutput> {
        return await this.miniHompiService.create(createMiniHompiInput, owner)
    }

    @Query(returns => GetAllMiniHompiOutput)
    async getAllMiniHompis(): Promise<GetAllMiniHompiOutput> {
        return await this.miniHompiService.getAll()
    }

    @Query(returns => GetMiniHompiOutput)
    async getMiniHompi(@Args('input') getMiniHompiInput: GetMiniHompiInput):Promise<GetMiniHompiOutput> {
        return await this.miniHompiService.getOne(getMiniHompiInput)
    }


}

