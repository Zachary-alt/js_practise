// 什么时候不能使用箭头函数:

// 1. 定义对象方法
// 1.1 定义字面量方法
const calculator = {
    array: [1, 2, 3],
    sum: () => {
        console.log(this === window); // => true
        return this.array.reduce((result, item) => result + item);
    }
};

console.log(this === window); // => true

// Throws "TypeError: Cannot read property 'reduce' of undefined"
calculator.sum();
// 修正后的代码如下 JS Bin：
const calculator = {
    array: [1, 2, 3],
    sum() {
        console.log(this === calculator); // => true
        return this.array.reduce((result, item) => result + item);
    }
};
calculator.sum(); // => 6

// 1.2 定义原型方法
function Cat(name) {
    this.name = name;
}

Cat.prototype.sayCatName = () => {
    console.log(this === window); // => true
    return this.name;
};

const cat = new Cat('Mew');
cat.sayCatName(); // => undefined


// 2. 定义事件回调函数
// this 是 JS 中很强大的特性，可以通过多种方式改变函数执行上下文，JS 内部也有几种不同的默认上下文指向，
// 但普适的规则是在谁上面调用函数 this 就指向谁，这样代码理解起来也很自然，读起来就像在说，某个对象上正在发生某件事情。
// 但是，箭头函数在声明的时候就绑定了执行上下文，要动态改变上下文是不可能的，在需要动态上下文的时候它的弊端就凸显出来。
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    console.log(this === window); // => true
    this.innerHTML = 'Clicked button';
});


// 3. 定义构造函数
// 构造函数中的 this 指向新创建的对象，当执行 new Car() 的时候，构造函数 Car 的上下文就是新创建的对象，
// 也就是说 this instanceof Car === true。显然，箭头函数是不能用来做构造函数， 实际上 JS 会禁止你这么做，如果你这么做了，它就会抛出异常。
const Message = (text) => {
    this.text = text;
};
// Throws "TypeError: Message is not a constructor"
const helloMessage = new Message('Hello World!');