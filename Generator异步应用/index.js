const fs=require('fs') 
function read(url){
    setTimeout(()=>{
        fs.readFile(url,(err,data)=>{
            it.next(data.toString())
        })
    },1000)
}

function* reader(){
    console.log(yield read('a.txt'));
    console.log(yield read('b.txt'));
    console.log(yield read('c.txt'));
    yield console.log('finish');
}

var it=reader()
it.next()