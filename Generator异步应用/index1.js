const fs=require('fs')
let readFile=function(url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,(err,data)=>{
            if(err) return reject(err)
            resolve(data)
        })
    })
};

let gen=function* (){
    let f1=yield readFile('a.txt')
    console.log(1);
    console.log(f1.toString());
    let f2=yield readFile('b.txt')
    console.log(2);
    console.log(f2.toString());
    let f3=yield readFile('c.txt')
    console.log(3);
    console.log(f3.toString());
}
function run(fn) {
    let g = fn()
    function next(data){
        let res=g.next(data)
        if(res.done){
            return res.value
        }else{
            res.value.then(v=>{
                next(v)
            })
        }
    }
    next()
}
run(gen)