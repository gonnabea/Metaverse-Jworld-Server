import { UseGuards, Request } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Resolver()
export class FooResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @UseGuards(LocalAuthGuard)
  @Mutation('/login')
  async login(@Request() req) {
    return req.user;
  }
}
