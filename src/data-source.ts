import "reflect-metadata"
import { DataSource } from "typeorm"
import { Search } from "./entity/Search"
import { Hot } from "./entity/Hot"
import { Web } from "./entity/Web"
import { Times } from "./entity/Times"
import { readFileSync } from "fs"
import path = require("path")

let pass = readFileSync(path.join(__dirname,"passwd.txt")).toString()
console.log("passwdIs:",pass)
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: pass,
    database: "hot",
    synchronize: true,
    logging: false,
    entities: [Search,Hot,Web,Times],
    migrations: [],
    subscribers: [],
})

// export const AppDataSource = new DataSource({
//     type: "sqlite",
//     database: "./hot.sqlite",
//     synchronize: true,
//     logging: false,
//     entities: [Search,Hot,Web,Times],
//     migrations: [],
//     subscribers: [],
// })
