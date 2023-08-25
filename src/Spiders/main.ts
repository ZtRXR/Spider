import { AppDataSource } from "../data-source";
import { Hot } from "../entity/Hot";
import { Search } from "../entity/Search";
import { Times } from "../entity/Times";
import { Web } from "../entity/Web";

export const SpiderMain = async (fromWeb: Web, HotList: Hot[]) => {
    //新建一个搜索
    let crtSearch = new Search()
    const nowDate = new Date()
    crtSearch.date = nowDate
    crtSearch.fromWeb = fromWeb
    crtSearch = await AppDataSource.manager.save(crtSearch)
    await Promise.all(HotList.map(async d => {
        d.fromSearch = crtSearch
        
        let fromTimes = new Times()
        //获取历史统计次数
        fromTimes = await AppDataSource.manager.findOneBy(Times,{
            word:d.word,
            fromWeb:fromWeb
        })
        //如果为空那么创建一个
        if(fromTimes==null){
            fromTimes = new Times()
            fromTimes.times=0
            fromTimes.word = d.word
            fromTimes.fromWeb =fromWeb
            fromTimes = await AppDataSource.manager.save(fromTimes)
        }
        //增加统计次数的出现次数
        fromTimes.times++
        //更新日期
        fromTimes.lastTime = nowDate
        fromTimes = await AppDataSource.manager.save(fromTimes)

        d.fromTimes = fromTimes

        await AppDataSource.manager.save(d)
    }))
}