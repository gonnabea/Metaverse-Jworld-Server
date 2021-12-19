import { UseGuards, Request, Body } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JoinInput, JoinOutput } from './users/dtos/join.dto';
import { LoginInput, LoginOutput } from './auth/dtos/login.dto';

@Resolver()
export class AppResolver {

  constructor(
    private appServeice: AppService,
    private authService: AuthService
) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

}
