import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1 day' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
