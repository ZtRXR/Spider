import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Search } from "./Search";
import { Times } from "./Times";

@Entity()
export class Web{
    @PrimaryGeneratedColumn()
    id:number
    @OneToMany((type)=>Search,(search)=>search.fromWeb)
    Searches:Search[]
    @Column()
    name:string
    @Column()
    fromUrl:string
    @Column()
    searchUrl:string
    @OneToMany(()=>Times,(times)=>times.fromWeb)
    times:Times[]
}