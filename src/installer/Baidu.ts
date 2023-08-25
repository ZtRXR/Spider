import { AppDataSource } from "../data-source"
import { Web } from "../entity/Web"

export const insBaidu = async ()=>{
    const newWeb = new Web()
    newWeb.fromUrl = "https://www.baidu.com/"
    newWeb.name = "Baidu"
    newWeb.searchUrl = "https://www.baidu.com/s?wd="
    await AppDataSource.manager.save(newWeb)
}