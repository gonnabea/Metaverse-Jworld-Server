import { UseGuards, Request, Body } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginOutput } from './users/dtos/login.dto';

@Resolver()
export class FooResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  // @UseGuards(LocalAuthGuard)
  // @Mutation(returns => LoginOutput)
  // async login(@Body('input') input ) {
  //   return 
  // }
}
