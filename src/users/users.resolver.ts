import { UseGuards, Request, Body } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { GetMeOutput } from './dtos/getMe.dto';
import { JoinInput, JoinOutput } from './dtos/join.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from './users.decorator';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => JoinOutput)
  async join(@Args('input') joinInput: JoinInput): Promise<JoinOutput> {
    return await this.usersService.join(joinInput);
  }

  @Mutation(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Query(() => GetMeOutput)
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() user) {
    console.log(user);
    return this.usersService.getMe(user);
  }
}
