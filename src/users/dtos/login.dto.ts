import { Field, InputType, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';


@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@InputType()
export class LoginOutput extends PickType(User, ['email', 'password']) {}