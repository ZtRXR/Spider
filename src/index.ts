import { readFileSync } from "fs";
import { runBiliSpider } from "./Spiders/Bilibili";
import { AppDataSource } from "./data-source"
import { Web } from "./entity/Web"
import { runBaiduSpider } from "./Spiders/Baidu";

let runTimes = 0;

const main = async () => {
    const startTime = new Date()
    await AppDataSource.initialize()
    // await AppDataSource.synchronize()
    // await insBilibili()

    let tasks: Promise<void>[] = []

    tasks.push(runBiliSpider())
    tasks.push(runBaiduSpider())

    await Promise.all(tasks) 
    setTimeout(async ()=>{
        await AppDataSource.destroy() 
        console.log("已关闭数据库...")
    },1000*60)
    console.log("延时数据库关闭....","10s")

    // setTimeout(async ()=>{

    //     console.log("数据库已关闭。。。")
    // },1000*10)

    // await AppDataSource.destroy()

    const endTime = new Date()
    const span = new Date(endTime.getTime() - startTime.getTime())
    runTimes++;
    console.log("时间：", endTime.toLocaleString(), "任务完成用时：", span.getMilliseconds(), "毫秒 || ", span.getSeconds(), "秒", `第${runTimes}次完成任务`)
}

main().then(() => {
    console.log("first test run is OK!!!")
    // AppDataSource.destroy()
}).catch(e => {
    console.error("first run error !!!!!!!!!!!!!!!", e)
    // process.exit(1)
})

// setInterval(()=>{
//     main().then(()=>{
//         console.log("run is OK!!!")
//     }).catch(e=>{
//         console.error("run error !!!!!!!!!!!!!!!",e)
//     })
// },1000*60*15)