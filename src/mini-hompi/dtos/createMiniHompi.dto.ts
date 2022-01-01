import { Field, InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Column } from "typeorm";
import { MiniHompi } from "../entities/miniHompi.entity";
import { GraphQLJSONObject } from 'graphql-type-json'

interface XYZType {
    x: number;
    y: number;
    z: number;
}


@InputType()
export class CreateMiniHompiInput extends PickType(MiniHompi, ['scale']) {}

@ObjectType()
export class CreateMiniHompiOutput extends CoreOutput {}