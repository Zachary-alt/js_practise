let obj = {
    age: 1,
    jobs: {
      first: "fe"
    },
    gf: undefined,
    reg:/w/g,
    run() {
      console.log("1");
    },
    sy:Symbol('xx')
  };
  obj.jobs.c=obj.jobs
  // 但是该方法也是有局限性的：
  
  // 会忽略 undefined
  // 会忽略 symbol
  // 不能序列化函数\正则
  // 不能解决循环引用的对象（直接报错）
  console.log("====================================");
  // console.log(JSON.parse(JSON.stringify(obj)));
  console.log("====================================");
  
  // 如果你所需拷贝的对象含有内置类型并且不包含函数\正则，可以使用 MessageChannel
  function structuralClone(obj) {
    return new Promise(res => {
      const { port1, port2 } = new MessageChannel();
      port2.onmessage = ev => res(ev.data); //接收来自port1
      port1.postMessage(obj); //发送给port2
    });
  }
  // 注意该方法是异步的
  // 可以处理 undefined 和循环引用对象
  (async () => {
    const clone = await structuralClone(obj);
    console.log(clone);
  })();
  // 当然如果你的数据中含有以上三种情况下，可以使用 lodash 的深拷贝函数
  
//  递归实现
  function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor();
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
    return cloneObj;
  }
  let obj = { name: 1, address: { x: 100 } };
  obj.o = obj; // 对象存在循环引用的情况
  let d = deepClone(obj);
  obj.address.x = 200;
  console.log(d);
  