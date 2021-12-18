import { UseGuards, Request, Body } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { JoinInput, JoinOutput } from './dtos/join.dto';
import { UsersService } from './users.service';


@Resolver()
export class UsersResolver {

    constructor(
        private usersService: UsersService
    ) {}



    @Query(() => String)
    sayHello(): string {
    return 'Hello World!';
    }

    @Mutation(returns => JoinOutput)
    async join(@Args('input') joinInput:JoinInput):Promise<JoinOutput> {
        return await this.usersService.join(joinInput)
    }
}
