let obj={
    a:1,
    b:2
}
// obj[Symbol.iterator]=function(){
//     let nextIndex = 0;
//     let keys = Object.keys(this);
//     return {
//         next:function(){
//             return nextIndex<keys.length?{value:keys[nextIndex++],done:false}:{value:undefined,done:true}
//         }
//     }
// }
obj[Symbol.iterator]=function* (){
    let keys = Object.keys(this);
    for(let item of keys){
        yield this[item]
    }
}
for(let item of obj){
    console.log(item);
}