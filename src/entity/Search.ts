import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hot } from "./Hot";
import { Web } from "./Web";

@Entity()
export class Search{
    @PrimaryGeneratedColumn()
    id:number
    @OneToMany((type)=>Hot,(hot)=>hot.fromSearch)
    Hots:Hot[]
    @ManyToOne((type)=>Web,(web)=>web.Searches)
    fromWeb
    @Column()
    date:Date
}