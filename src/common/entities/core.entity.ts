import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: number

    @CreateDateColumn()
    @Field(type => Date, {defaultValue: new Date().toLocaleTimeString()})
    createdAt: Date

    @UpdateDateColumn()
    @Field(type => Date, {defaultValue: new Date().toLocaleTimeString()})
    updatedAt: Date

}