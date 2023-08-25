import axios from "axios"
import { Hot } from "../entity/Hot"
import { AppDataSource } from "../data-source"
import { Web } from "../entity/Web"
import { Search } from "../entity/Search"
import { IsNull } from "typeorm"
import { Times } from "../entity/Times"
import { SpiderMain } from "./main"
import { insBilibili } from "../installer/Bilibili"

export const runBiliSpider = async () => {
    await main()
}

const main = async () => {
    const axiosRaw = await axios.get("https://api.bilibili.com/x/web-interface/wbi/search/square?limit=50")
    const getList: any[] = axiosRaw.data.data.trending.list
    const crtHots: Hot[] = []
    getList.forEach(d => {
        const newHot = new Hot()
        newHot.word = d.keyword
        crtHots.push(newHot)
    })
    // console.log(crtHots)
    let fromWeb = await AppDataSource.manager.findOneBy(Web, {
        name: "Bilibili"
    })
    if (fromWeb == null) {
        await insBilibili()
        fromWeb = await AppDataSource.manager.findOneByOrFail(Web, {
            name: "Bilibili"
        })
    }
    await SpiderMain(fromWeb, crtHots)
}