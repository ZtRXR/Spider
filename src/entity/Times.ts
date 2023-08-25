import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hot } from "./Hot";
import { Web } from "./Web";

@Entity()
export class Times{
    @PrimaryGeneratedColumn()
    id:number
    @OneToMany((type)=>Hot,(hot)=>hot.fromTimes)
    Hots:Hot[]
    @Column()
    times:number
    @Column()
    word:string
    @ManyToOne(()=>Web,(web)=>web.times)
    fromWeb:Web
    @Column()
    lastTime:Date
}