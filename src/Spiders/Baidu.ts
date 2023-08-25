import axios from 'axios';
import {JSDOM} from 'jsdom'
import { Hot } from '../entity/Hot';
import { AppDataSource } from '../data-source';
import { Web } from '../entity/Web';
import { insBaidu } from '../installer/Baidu';
import { SpiderMain } from './main';

export const runBaiduSpider = async ()=>{
    await main()
}

const main = async ()=>{
    const {window} = await JSDOM.fromURL("https://top.baidu.com/board?tab=realtime")
    const document = window.document
    let getClasses =  document.querySelectorAll(".c-single-text-ellipsis")
    let ListHots:Hot[] = []
    getClasses.forEach(d=>{
        const NewHot = new Hot()
        NewHot.word=d.innerHTML.trim()
        ListHots.push(NewHot)
    })
    let fromWeb = await AppDataSource.manager.findOneBy(Web,{
        name:"Baidu"
    })
    if(fromWeb == null){
        await insBaidu()
        fromWeb = await AppDataSource.manager.findOneByOrFail(Web,{
            name:"Baidu"
        })
    }

    SpiderMain(fromWeb,ListHots)
}
