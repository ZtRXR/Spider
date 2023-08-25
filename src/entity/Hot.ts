import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Search } from "./Search";
import { Times } from "./Times";

@Entity()
export class Hot{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    word:string
    @ManyToOne(()=>Search,(search)=>search.Hots)
    fromSearch:Search
    @ManyToOne((type)=>Times,(time)=>time.Hots)
    fromTimes
}