var promise=new Promise(function(resolve, reject){
    resolve(1)
})
var ajax=function (v) {
    return new Promise(function(resolve, reject){
        resolve(v)
    })
}
promise.then(function(res){
    console.log(res);
    return ajax(2)
}).then(function(res){
    console.log(res);
    return ajax(3)
}).then(function(res){
    console.log(res);
    return ajax(4)
}).then(function(res){
    console.log(res);
})

var arr=[
    new Promise(function(resolve, reject){
        setTimeout(()=>{
            resolve(5)
        },1000)
    }),
    ajax(6),
    ajax(7)
]
async function go(){
    try {
        const first = await Promise.any(arr); //该方法目前是一个第三阶段的提案 。
        console.log(first);
    } catch (error) {
        console.log(error);
    }

}
go()

Promise.all(arr).then(res=>{
    console.log(1,res);
},err=>{
    console.log(1,err);
})
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
Promise.race(arr).then(res=>{
    console.log(2,res);
},err=>{
    console.log(3,err);
})