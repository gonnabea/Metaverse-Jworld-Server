import { Field, InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Column } from "typeorm";
import { ThreeModel } from "../entities/threeModel.entity";

@InputType()
export class SaveThreeModelInput extends OmitType(ThreeModel, ["owner", "miniHompi", "id", "createdAt", "updatedAt"]) {


}

@ObjectType()
export class SaveThreeModelOutput extends CoreOutput {}