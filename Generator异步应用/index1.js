const fs=require('fs')
var readFile=function(url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,(err,data)=>{
            console.log(data);
            
            if(err) return reject(err)
            resolve(data)
        })
    })
};

var gen=function* (){
    var f1=yield readFile('a.txt')
    var f2=yield readFile('b.txt')
    var f3=yield readFile('c.txt')
    console.log(f1.toString());
    console.log(f2.toString());
    console.log(f3.toString());
}
function run(fn) {
    var g = fn()
    function next(data){
        var res=g.next(data)
        console.log(res);
        
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