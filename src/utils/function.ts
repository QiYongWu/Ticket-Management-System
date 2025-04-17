//Anti-shake and throttling 防抖 节流 函数
const AntiShake = (timeout:number,timeoutId:number,func:Function)=> {
    if(timeoutId){
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(()=>{
        func();
    },timeout)
}

const Throttling = (timeout:number,timeoutId:number,func:Function) =>{
    if(timeoutId){
        return ;
    }
    timeoutId = setTimeout(()=>{
        func();
        timeoutId=0;
    },timeout)
}

export {AntiShake,Throttling}

