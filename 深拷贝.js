let obj = {
    age: 1,
    jobs: {
      first: "fe"
    },
    gf: undefined
    // run() {
    //   console.log("1");
    // },
    // b: {
    //   c: b
    // }
  };
  // 但是该方法也是有局限性的：
  
  // 会忽略 undefined
  // 会忽略 symbol
  // 不能序列化函数
  // 不能解决循环引用的对象
  console.log("====================================");
  // console.log(JSON.parse(JSON.stringify(obj)));
  console.log("====================================");
  
  // 如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 MessageChannel
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
  function DeepClone (obj) {
      if (obj === null || typeof obj !== 'object') return obj;
      var cpObj = obj instanceof Array ? [] : {};
      for (var key in obj) cpObj[key] = DeepClone(obj[key]);
      return cpObj;
  }