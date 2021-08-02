// function curry(fn){
//         var _args = [].slice.call(arguments, 1);
//         console.log(1,_args);
//         return function(){
//             console.log(2,Array.prototype.slice.call(arguments));
//             let newArgs=[..._args,...Array.prototype.slice.call(arguments)]
//             console.log(23,newArgs);
//             return fn.apply(null, newArgs);
//         }
//     }
// function add1(){
//     let args = [].slice.call(arguments)
//     console.log(3,args);
//     if(args.length){
//         return args.reduce((a,b)=>{
//             return a+b
//         })
//     }
//     return 0
// }
// let add = curry(add1,0);    
// console.log(233,add);
// // console.log(add1(1,2,3,4,5));
// console.log(add(1,2,3,4,5));

const curry = (fn, ...args) => 
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => curry(fn, ...args, ..._args);

function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3,4));
