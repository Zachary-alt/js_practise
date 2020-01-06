// console.log(1)

// setTimeout(() => {
//   console.log(2)
// }, 0)

// Promise.resolve().then(() => {
// 	console.log(3)
// }).then(() => {
// 	console.log(4)
// })

// console.log(5)
// 正确结果是：1、5、3、4、2。

// 定义

// 关键步骤如下：
// 1、执行最旧的task宏任务（一次）   宏任务主要包含：setTimeout、setInterval、setImmediate、I/O、UI交互事件
// 2、检查是否存在microtask，然后不停执行，直到清空队列（多次）    microtask微任务主要包含：Promise、process.nextTick、MutaionObserver
// 3、执行render

// 继续测试（2）
// console.log(1)

// setTimeout(() => {
//     console.log(2)
//     new Promise(resolve => {
//         console.log(4)
//         resolve()
//     }).then(() => {
//         console.log(5)
//     })
// })

// new Promise(resolve => {
//     console.log(7)
//     resolve()
// }).then(() => {
//     console.log(8)
// })

// setTimeout(() => {
//     console.log(9)
//     new Promise(resolve => {
//         console.log(11)
//         resolve()
//     }).then(() => {
//         console.log(12)
//     })
// })
// 分析如下：

// 同步运行的代码首先输出：1、7
// 接着，清空microtask队列：8
// 第一个task执行：2、4
// 接着，清空microtask队列：5
// 第二个task执行：9、11
// 接着，清空microtask队列：12
// node执行结果:1 7 8 2 4 9 11 5 12

// new Promise(resolve => {
//     resolve()
//     console.log(0)
// }).then(() => {
//     console.log('01')
// })
// console.log(1)

// setTimeout(() => {
//     console.log(2)
//     new Promise(resolve => {
//         console.log(4)
//         resolve()
//     }).then(() => {
//         console.log(5)
//     })
//     process.nextTick(() => {
//         console.log(3)
//     })
// })

// new Promise(resolve => {
//     console.log(7)
//     resolve()
// }).then(() => {
//     console.log(8)
// })

// process.nextTick(() => {
//     console.log(6)
// })
// 正确答案是：0、1、7、6、01、8、2、4、3、5。
// **process.nextTick注册的函数优先级高于Promise**

console.log(1)

setTimeout(() => {
    console.log(2)
    new Promise(resolve => {
        console.log(4)
        resolve()
    }).then(() => {
        console.log(5)
    })
    process.nextTick(() => {
        console.log(3)
    })
})

new Promise(resolve => {
    console.log(7)
    resolve()
}).then(() => {
    console.log(8)
})
// new Promise(resolve => {
//     console.log(71)
//     resolve()
// }).then(() => {
//     console.log(81)
// })

process.nextTick(() => {
    console.log(6)
})

setTimeout(() => {
    console.log(9)
    process.nextTick(() => {
        console.log(10)
    })
    new Promise(resolve => {
        console.log(11)
        resolve()
    }).then(() => {
        console.log(12)
    })
})
console.log(13)
// 输出结果是：1、7、13、6、8、2、4、9、11、3、10、5、12