import { AppDataSource } from "../data-source"
import { Web } from "../entity/Web"

const insBilibili = async ()=>{
    await AppDataSource.initialize()
    const BiliWeb = new Web()
    BiliWeb.name="Bilibili"
    BiliWeb.fromUrl="https://www.bilibili.com/"
    BiliWeb.searchUrl="https://search.bilibili.com/all?keyword="
    await AppDataSource.manager.save(BiliWeb)
    const findBili = await AppDataSource.manager.find(Web)
    console.log("Created",findBili)
}

insBilibili()
// export const insBilibili = async ()=>{
//     const getBili = await AppDataSource.manager.findOne(Web,{
//         where:{
//             name:"Bilibili"
//         }
//     })
//     console.log(getBili)
//     getBili.fromUrl="https://www.bilibili.com/"
//     getBili.searchUrl="https://search.bilibili.com/all?keyword="
//     const nextBili = await AppDataSource.manager.save(getBili)
//     console.log(nextBili)
// }