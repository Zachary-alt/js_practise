// 当我们执行 JS 代码的时候其实就是往执行栈中放入函数，那么遇到异步代码的时候该怎么办？
// 其实当遇到异步的代码时，会被挂起并在需要执行的时候加入到 Task（有多种 Task） 队列中。
// 一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

// 不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。
// 在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task。下面来看以下代码的执行顺序：
console.log('script start');

async function async1() {
    await async2()
    console.log('async1 end');
}
async function async2() {
    console.log('async2 end');
}
async1()
setTimeout(()=>{
    console.log('setTimeout');
},0)
new Promise(resolve=>{
    console.log('Promise');
    resolve()
}).then(()=>{
    console.log('Promise1');
}).then(()=>{
    console.log('Promise2');
})
console.log('script end');
// script start、async2 end、Promise、script end、Promise1、Promise2、async1 end、setTimeout

// 首先先来解释下上述代码的 async 和 await 的执行顺序。
// 当我们调用 async1 函数时，会马上输出 async2 end，并且函数返回一个 Promise，
// 接下来在遇到 await的时候会就让出线程开始执行 async1 外的代码，所以我们完全可以把 await 看成是让出线程的标志。
// 然后当同步代码全部执行完毕以后，就会去执行所有的异步代码，那么又会回到 await 的位置执行返回的 Promise 的 resolve 函数，
// 这又会把 resolve 丢到微任务队列中，接下来去执行 then 中的回调，当两个 then 中的回调全部执行完毕以后，
// 又会回到 await 的位置处理返回值，这时候你可以看成是 Promise.resolve(返回值).then()，
// 然后 await 后的代码全部被包裹进了 then 的回调中，所以 console.log('async1 end') 会优先执行于 setTimeout。

// 如果你觉得上面这段解释还是有点绕，那么我把 async 的这两个函数改造成你一定能理解的代码
new Promise((resolve, reject) => {
    console.log('async2 end')
    // Promise.resolve() 将代码插入微任务队列尾部
    // resolve 再次插入微任务队列尾部
    resolve(Promise.resolve())
}).then(() => {
    console.log('async1 end')
})

// 所以 Event Loop 执行顺序如下所示：
// 首先执行同步代码，这属于宏任务
// 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
// 执行所有微任务    
// 当执行完所有微任务后，如有必要会渲染页面
// 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

// 微任务包括 process.nextTick ，promise ，MutationObserver。
// 宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

// Node 中的 Event Loop 和浏览器中的是完全不相同的东西。
