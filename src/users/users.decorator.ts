import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// jwt 토큰을 해석해주는 데코레이터
export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    console.log(ctx.req.user);
    return ctx.req.user;
  },
);
