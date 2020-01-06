// 柯里化，英语：Currying，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
// 并且返回接受余下的参数而且返回结果的新函数的技术。

// 来列一列Currying有哪些好处呢？
// 1. 参数复用
function curryingCheck(reg){
    return function(txt){
        return reg.test(txt)
    }
}
var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

hasNumber('test1')      // true
hasNumber('testtest')   // false
hasLetter('21212')      // false

// 2. 提前确认
// var on = function(element, event, handler) {
//     if (document.addEventListener) {
//         if (element && event && handler) {
//             element.addEventListener(event, handler, false);
//         }
//     } else {
//         if (element && event && handler) {
//             element.attachEvent('on' + event, handler);
//         }
//     }
// }

// var on = (function() {
//     if (document.addEventListener) {
//         return function(element, event, handler) {
//             if (element && event && handler) {
//                 element.addEventListener(event, handler, false);
//             }
//         };
//     } else {
//         return function(element, event, handler) {
//             if (element && event && handler) {
//                 element.attachEvent('on' + event, handler);
//             }
//         };
//     }
// })();
//换一种写法可能比较好理解一点，上面就是把isSupport这个参数给先确定下来了
var on = function(isSupport, element, event, handler) {
    isSupport = isSupport || document.addEventListener;
    if (isSupport) {
        return element.addEventListener(event, handler, false);
    } else {
        return element.attachEvent('on' + event, handler);
    }
}
// 我们在做项目的过程中，封装一些dom操作可以说再常见不过，上面第一种写法也是比较常见，但是我们看看第二种写法，
// 它相对一第一种写法就是自执行然后返回一个新的函数，这样其实就是提前确定了会走哪一个方法，避免每次都进行判断。

// 3. 延迟运行
Function.prototype.bind1=function (ctx) { 
    let _this=this;
    // args 获取第一个方法内的全部参数
    let args=Array.prototype.slice.call(arguments,1)
    return function () {  
        // 将后面方法里的全部参数和args进行合并
        var newArgs = args.concat(Array.prototype.slice.call(arguments))
        // 把合并后的参数通过apply作为fn的参数并执行
        return _this.apply(ctx,newArgs)
    }
}
// 像我们js中经常使用的bind，实现的机制就是Currying.

// 这样返回的话其实只能多扩展一个参数，currying(a)(b)(c)这样的话，貌似就不支持了（不支持多参数调用），一般这种情况都会想到使用递归再进行封装一层。
// 支持多参数传递
function progressCurrying(fn, args) {
    var _this = this
    var len = fn.length;
    var args = args || [];

    return function() {
        var _args = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(args, _args);
        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (_args.length < len) {
            return progressCurrying.call(_this, fn, _args);
        }
        // 参数收集完毕，则执行fn
        return fn.apply(this, _args);
    }
}

// curry的性能

// 1、存取arguments对象通常要比存取命名参数要慢一点
// 2、一些老版本的浏览器在arguments.length的实现上是相当慢的
// 3、使用fn.apply( … ) 和 fn.call( … )通常比直接调用fn( … ) 稍微慢点
// 4、创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上


// 最后再扩展一道经典面试题
// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
function add(){
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder=function () {
        _args.push(...arguments)
        return _adder
    }
    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString=function(){
        console.log(2,_args);
        return _args.reduce((a,b)=>{
            return a+b
        })
    }
    return _adder
}
// add(1,2,3,4)(1)(2)
console.log(33333333,add(1,2,3,4)(1)(2)(3)+1-1);

