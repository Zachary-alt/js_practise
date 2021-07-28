// 对象在转换基本类型时，首先会调用 valueOf 然后调用 toString。并且这两个方法你是可以重写的。
// 当然你也可以重写 Symbol.toPrimitive ，该方法在转基本类型时调用优先级最高。
let a = {
    value: 99,
    valueOf() {
      return 0;
    },
    tostring() {
      return "1";
    },
    [Symbol.toPrimitive]() {
      return 2;
    }
  };
  
  console.log(a == 2);
  console.log(1 + a);
  console.log("1" + a);