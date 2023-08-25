import { runBiliSpider } from "./Spiders/Bilibili";
import { AppDataSource } from "./data-source"
import { Web } from "./entity/Web"

let runTimes = 0;

const main = async ()=>{
    const startTime = new Date()
    await AppDataSource.initialize()
    // await AppDataSource.synchronize()
    // await insBilibili()
    await runBiliSpider()
    
    
    await AppDataSource.destroy()
    const endTime = new Date()
    const span = new Date(endTime.getTime() -startTime.getTime())
    runTimes++;
    console.log("时间：",endTime.toLocaleString(),"任务完成用时：",span.getMilliseconds(),"毫秒 || ",span.getSeconds(),"秒",`第${runTimes}次完成任务`)
}

main().then(()=>{
    console.log("first test run is OK!!!")
}).catch(e=>{
    console.error("first run error !!!!!!!!!!!!!!!",e)
    process.exit(1)
})

// setInterval(()=>{
//     main().then(()=>{
//         console.log("run is OK!!!")
//     }).catch(e=>{
//         console.error("run error !!!!!!!!!!!!!!!",e)
//     })
// },1000*60*15)