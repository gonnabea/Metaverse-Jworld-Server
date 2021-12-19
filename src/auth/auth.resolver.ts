import { Query, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { LoginInput, LoginOutput } from 'src/auth/dtos/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { LocalAuthGuard } from './local-auth.guard';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput ):Promise<LoginOutput> {
        console.log(loginInput)
        return await this.authService.login(loginInput)
    }

    // @UseGuards(JwtAuthGuard)
    // @Query(returns => CoreOutput)
    // getProfile(@Args() req) {
    //   return req.user;
    // }
}
