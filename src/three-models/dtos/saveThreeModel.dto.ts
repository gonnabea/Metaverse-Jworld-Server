import { Field, InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { type } from "os";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Column } from "typeorm";
import { ThreeModel } from "../entities/threeModel.entity";
import { GraphQLJSONObject } from 'graphql-type-json'

interface XYZType {
    x: number;
    y: number;
    z: number;
}


@InputType()
export class SaveThreeModelInput {

    @Field(type => [ThreeModelInput])
    @Column()
    models: ThreeModel[]

    

}

@InputType()
class ThreeModelInput {
    @Column('text')
    @Field(type => String)
    name: string;
  
    @Column({type:"json"})
    @Field(type => GraphQLJSONObject)
    position: XYZType;
  
    @Column({type:"json"})
    @Field(type => GraphQLJSONObject)
    scale: XYZType;
  
    @Column()
    @Field(type => String)
    rotateY: string;
  
    @Column()
    @Field(type => Boolean)
    installed: boolean;
  
    @Column({default: 0})
    @Field(type => Number, {defaultValue: 0})
    price: number;

    @Column({default: false})
    @Field(type => String, {nullable: true})
    videoUrl?: string;
    
    @Column({default: false})
    @Field(type => String, {nullable: true})
    imageUrl?: string;
    
    @Column({default: false})
    @Field(type => String, {nullable: true})
    textContents?: string;
  
}

@ObjectType()
export class SaveThreeModelOutput extends CoreOutput {}