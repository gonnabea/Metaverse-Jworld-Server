import { Logger, Request, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { LoginInput, LoginOutput } from 'src/auth/dtos/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { LocalAuthGuard } from './local-auth.guard';
import { GqlAuthGuard } from './gql-auth.guard';

export interface Context {
    user?: any;
  }

@Resolver()
export class AuthResolver {
    // private logger: Logger;
    constructor(private authService: AuthService) {
        // this.logger = new Logger('AuthResolver');
    }

    
    @Query(() => String)
    async login(@Args('input') loginInput: LoginInput):Promise<String | Boolean> {
        try {
        
            const token = this.authService.login(loginInput);
      
            return token;
          } catch (e) {
            // this.logger.error(e);
            console.log(e)
            return false;
          }
    }

    // @UseGuards(JwtAuthGuard)
    // @Query(returns => CoreOutput)
    // getProfile(@Args() req) {
    //   return req.user;
    // }
}
